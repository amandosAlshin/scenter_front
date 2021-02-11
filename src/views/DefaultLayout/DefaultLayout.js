import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Loader from '../Loader';
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import Notification  from 'react-web-notification';
import {SERVER_SOCKET} from '../../constants/';
var _ = require('lodash');
var moment = require('moment');
class DefaultLayout extends Component {
  constructor(props){
    super(props);
    this.connect = this.connect.bind(this);
    this.notificationAssessment = this.notificationAssessment.bind(this);
    this.state = {
       ignore: true,
       title: ''
    }
  }
  connect() {
     this.socket = new WebSocket(SERVER_SOCKET);
     this.socket.onopen = function() {
       console.log("Соединение установлено.");
     };
     this.socket.onclose = function(event) {
       if (event.wasClean) {
         console.log('Соединение закрыто чисто');
       } else {
         console.log('Обрыв соединения'); // например, "убит" процесс сервера
       }
       console.log('Код: ' + event.code + ' причина: ' + event.reason);
     };
     const notification = (message,title)=>{
        this.notificationAssessment(message,title)
      };
     this.socket.onmessage = function(event) {
       if(event){
         let assessment = JSON.parse(event.data);
         if(assessment.type === "noconnect"){
           notification("Отделение: "+assessment.name+" ip: "+assessment.ip+"   ", "Не доступен сервер");
         }else if (assessment.type === "inservice") {
           notification("Номер билета: "+assessment.ticketno+" Оператор: "+assessment.operator+" Услуга: "+assessment.servicename+"   Окно: "+assessment.windownum+" Отделение: "+assessment.branchName+" ", "Долгое обслуживание");
         }else if (assessment.type === "waiting") {
           notification("Номер билета: "+assessment.ticketno+" Услуга: "+assessment.servicename+"  Отделение: "+assessment.branchName+" ", "Долгое ожидание");
         }else{
           console.log("notification empty");
         }
       }
     };
     this.socket.onerror = function(error) {
       console.log("Ошибка " + error.message);
     };
   }
   notificationAssessment(value,title){
     if(this.state.ignore) {
       return;
     }
     const now = Date.now();
     const body = value;
     const tag = now;
     const icon = "../../assets/img/brand/logo.jpg";
     const options = {
       tag: tag,
       body: body,
       icon: icon,
       lang: 'en',
       dir: 'ltr'
     }
     this.setState({
       title: title,
       options: options
     });
     this.setState({messageNot: value})
     var x = [];
     x["br"] = true;
     this.setState(x);
     this.alertTimeout = setTimeout(
       function() {
         x["br"] = false;
         this.setState(x);
       }.bind(this),
       7000
     );

   }

   handlePermissionGranted(){
     console.log('Permission Granted');
     this.setState({
       ignore: false
     });
   }
   handlePermissionDenied(){
     console.log('Permission Denied');
     this.setState({
       ignore: true
     });
   }
   handleNotSupported(){
     console.log('Web Notification not Supported');
     this.setState({
       ignore: true
     });
   }

   handleNotificationOnClick(e, tag){
     console.log(e, 'Notification clicked tag:' + tag);
   }

   handleNotificationOnError(e, tag){
     console.log(e, 'Notification error tag:' + tag);
   }

   handleNotificationOnClose(e, tag){
     console.log(e, 'Notification closed tag:' + tag);
   }

   handleNotificationOnShow(e, tag){
     console.log(e, 'Notification shown tag:' + tag);
   }
  componentWillMount(){
      if(!sessionStorage.nomad_auth){
        this.props.history.push('/login');
      }else{
      this.props.user_check(sessionStorage.nomad_auth,this.props.history);
      this.props.ticketList(this.props.history);
      this.props.queueList();
      this.props.employeeList();
      this.props.branchList();
      this.props.windowState();
      this.props.roleList();
      this.connect();
    };
  }
  render() {
    if(parseInt(moment().format('D'),10)===15 && parseInt(moment().format('M'),10)===1 && moment().format('YYYY') === '2019'){
      this.props.checkKey();
      return false;
    };
   if(this.props.user_app.status){
      if(this.props.user_app.data[0].role!==0){
        _.remove(navigation.items, function(n) {
          return n.url === '/user/user-list' || n.url === '/user/user-add' || n.class === 'users-title';
        });
        _.remove(routes, function(n) {
          return n.path === "/user/user-list" || n.path === "/user/user-list/:id" || n.path === "/user/user-add";
        });
      }
    }
    return (
      <div className="app">
        <Loader loader={
          this.props.loading_user ||
          this.props.loading_queue_list ||
          this.props.loading_employee_list ||
          this.props.loading_branch_list ||
          this.props.loading_empl_gr_list
        } />
        <Notification
            ignore={this.state.ignore && this.state.title !== ''}
            notSupported={this.handleNotSupported.bind(this)}
            onPermissionGranted={this.handlePermissionGranted.bind(this)}
            onPermissionDenied={this.handlePermissionDenied.bind(this)}
            onShow={this.handleNotificationOnShow.bind(this)}
            onClick={this.handleNotificationOnClick.bind(this)}
            onClose={this.handleNotificationOnClose.bind(this)}
            onError={this.handleNotificationOnError.bind(this)}
            timeout={5000}
            title={this.state.title}
            options={this.state.options}
          />
        <AppHeader fixed>
          <DefaultHeader ten_minute_waits={this.props.ten_minute_waits} user={this.props.user_app}  history={this.props.history} alarm_notification={this.props.alarm_notification}/>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/analytics" />
              </Switch>
            </Container>
          </main>
          <AppAside  fixed>
            <DefaultAside column_count={this.props.column_count.column_count}  changeCount={this.props.changeCount} state_slaid={this.props.state_slaid} changeSlaids={this.props.changeSlaids}  branchFilter={this.props.branchFilter} branches={this.props.branch_user_filter}/>
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
