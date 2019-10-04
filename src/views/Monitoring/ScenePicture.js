import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Popover,
  TabContent,
  TabPane,
  PopoverBody,
  PopoverHeader
} from 'reactstrap';
import Table from 'antd/lib/table';
import './css';
class ScenePicture extends Component {
  constructor(props){
    super(props)
    this.show = this.show.bind(this)
    this.toggle = this.toggle.bind(this);
    this.state = {
      data: [],
      tooltipWaitsManagerOpen: false,
      tooltipWaitsCachierOpen: false,
      tooltipCachierOpen: false,
      tooltipManagerOpen: false
    };
  }
  componentWillMount(){
    var cachier_waits=[],
        manager_waits=[],
        cachier=[],
        manager=[];
      if(this.props.data){
        if(this.props.data.newtickets.length>0){
          var cachier_newtickets_group=[],
              manager_newtickets_group=[];
          for(var n=0; n<=this.props.data.newtickets.length-1;n++){
            if(this.props.data.newtickets[n].worktitle === 'Кассир'){
              cachier_newtickets_group.push(this.props.data.newtickets[n].tickets);
            }else{
              manager_newtickets_group.push(this.props.data.newtickets[n].tickets);
            }
          }
          if(cachier_newtickets_group.length>0){
            for(var cn = 0; cn <= cachier_newtickets_group[0].length-1; cn++) {
                cachier_waits.push(false);
            }
          }
          if(manager_newtickets_group.length>0){
            for(var mn = 0; mn <= manager_newtickets_group[0].length-1; mn++) {
                manager_waits.push(false);
            }
          }
        }
        if(this.props.data.windows.length>0){
          var cachier_group=[],
              manager_group=[];
          for(var w=0; w<=this.props.data.windows.length-1;w++){
            if(this.props.data.windows[w].worktitle === 'Кассир'){
              cachier_group.push(this.props.data.windows[w].windows);
            }else{
              manager_group.push(this.props.data.windows[w].windows);
            }
          }
          if(cachier_group.length>0){
            for(var c = 0; c <= cachier_group[0].length-1; c++) {
                cachier.push(false);
            }
          }
          if(manager_group.length>0){
            for(var m = 0; m <= manager_group[0].length-1; m++) {
                manager.push(false);
            }
          }
      }
      this.setState({data: this.props.data,tooltipWaitsManagerOpen: manager_waits,tooltipWaitsCachierOpen: cachier_waits,tooltipCachierOpen: cachier,tooltipManagerOpen: manager});
    }
  }
  componentWillReceiveProps(props){
    var cachier_waits=[],
        manager_waits=[],
        cachier=[],
        manager=[];
      if(props.data){
        if(props.data.newtickets.length>0){
          var cachier_newtickets_group=[],
              manager_newtickets_group=[];
          for(var n=0; n<=props.data.newtickets.length-1;n++){
            if(props.data.newtickets[n].worktitle === 'Кассир'){
              cachier_newtickets_group.push(props.data.newtickets[n].tickets);
            }else{
              manager_newtickets_group.push(props.data.newtickets[n].tickets);
            }
          }
          if(cachier_newtickets_group.length>0){
            for(var cn = 0; cn <= cachier_newtickets_group[0].length-1; cn++) {
                cachier_waits.push(false);
            }
          }
          if(manager_newtickets_group.length>0){
            for(var mn = 0; mn <= manager_newtickets_group[0].length-1; mn++) {
                manager_waits.push(false);
            }
          }
        }
        if(props.data.windows.length>0){
          var cachier_group=[],
              manager_group=[];
          for(var w=0; w<=props.data.windows.length-1;w++){
            if(props.data.windows[w].worktitle === 'Кассир'){
              cachier_group.push(props.data.windows[w].windows);
            }else{
              manager_group.push(props.data.windows[w].windows);
            }
          }
          if(cachier_group.length>0){
            for(var c = 0; c <= cachier_group[0].length-1; c++) {
                cachier.push(false);
            }
          }
          if(manager_group.length>0){
            for(var m = 0; m <= manager_group[0].length-1; m++) {
                manager.push(false);
            }
          }
        }
        this.setState({data: props.data,tooltipWaitsManagerOpen: manager_waits,tooltipWaitsCachierOpen: cachier_waits,tooltipCachierOpen: cachier,tooltipManagerOpen: manager});
      }
  }
  componentDidUpdate(prevProps, prevState){
    console.log(prevProps.data,this.props.data);
    if(prevProps.data !== this.props.data){
      var cachier_waits=[],
          manager_waits=[],
          cachier=[],
          manager=[];
        if(this.props.data){
          if(this.props.data.newtickets.length>0){
            var cachier_newtickets_group=[],
                manager_newtickets_group=[];
            for(var n=0; n<=this.props.data.newtickets.length-1;n++){
              if(this.props.data.newtickets[n].worktitle === 'Кассир'){
                cachier_newtickets_group.push(this.props.data.newtickets[n].tickets);
              }else{
                manager_newtickets_group.push(this.props.data.newtickets[n].tickets);
              }
            }
            if(cachier_newtickets_group.length>0){
              for(var cn = 0; cn <= cachier_newtickets_group[0].length-1; cn++) {
                  cachier_waits.push(false);
              }
            }
            if(manager_newtickets_group.length>0){
              for(var mn = 0; mn <= manager_newtickets_group[0].length-1; mn++) {
                  manager_waits.push(false);
              }
            }
          }
          if(this.props.data.windows.length>0){
            var cachier_group=[],
                manager_group=[];
            for(var w=0; w<=this.props.data.windows.length-1;w++){
              if(this.props.data.windows[w].worktitle === 'Кассир'){
                cachier_group.push(this.props.data.windows[w].windows);
              }else{
                manager_group.push(this.props.data.windows[w].windows);
              }
            }
            if(cachier_group.length>0){
              for(var c = 0; c <= cachier_group[0].length-1; c++) {
                  cachier.push(false);
              }
            }
            if(manager_group.length>0){
              for(var m = 0; m <= manager_group[0].length-1; m++) {
                  manager.push(false);
              }
            }
        }
        }

        this.setState({data: this.props.data,tooltipWaitsManagerOpen: manager_waits,tooltipWaitsCachierOpen: cachier_waits,tooltipCachierOpen: cachier,tooltipManagerOpen: manager});
    }
  }
  toggle(i,type) {
    var newArray=[];
    switch (type) {
      case 'waitsManager':
        newArray = this.state.tooltipWaitsManagerOpen.map((element, index) => {
          return (index === i ? !element : false);
        });
        this.setState({
          tooltipWaitsManagerOpen: newArray,
        });
        break;
      case 'waitsCachier':
        newArray = this.state.tooltipWaitsCachierOpen.map((element, index) => {
          return (index === i ? !element : false);
        });
        this.setState({
          tooltipWaitsCachierOpen: newArray,
        });
        break;
      case 'cachier':
        newArray = this.state.tooltipCachierOpen.map((element, index) => {
          return (index === i ? !element : false);
        });
        this.setState({
          tooltipCachierOpen: newArray,
        });
        break;
      case 'manager':
        newArray = this.state.tooltipManagerOpen.map((element, index) => {
          return (index === i ? !element : false);
        });
        this.setState({
          tooltipManagerOpen: newArray,
        });
        break;
      default:
        break;
    }

  }
  timeShow(text){
    var hours = new Date((parseInt(text,10)/1000)*1000).getHours(),
        minutes = new Date((parseInt(text,10)/1000)*1000).getMinutes();
    if(hours === 6 && minutes === 0){
      return '--';
    }else{
      return hours + ":"  + minutes;
    }
  }
  showWaitingTime(data){
    if(data){
      if(data.length>0){
        return(
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{data[0].waitsConvert}</div>
                <div>Среднее время ожидания</div>
              </CardBody>
            </Card>
          </Col>
        )
      }else{
        return(
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">0 минут</div>
                <div>Среднее время ожидания</div>
              </CardBody>
            </Card>
          </Col>
        )
      }
    }else{
      return false;
    }
  }
  showServTime(data){
    if(data){
      if(data.length>0){
        return(
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
               <div className="text-value">{data[0].servConvert}</div>
                <div>Среднее время обслуживания</div>
              </CardBody>
            </Card>
          </Col>
        );
      }else{
        return(
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">0 минут</div>
                <div>Среднее время обслуживания</div>
              </CardBody>
            </Card>
          </Col>
        );
      }
    }else{
      return false;
    }
  }
  showWaitingCount(data){
    if(data){
      if(data.length>0){
        return(
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{data.length}</div>
                <div>Количество ожидающих</div>
              </CardBody>
            </Card>
          </Col>
        )
      }else{
        return(
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">0</div>
                <div>Количество ожидающих</div>
              </CardBody>
            </Card>
          </Col>
        )
      }
    }else{
      return false;
    }

  }
  showServCout(data){
    if(data){
      if(data.length>0){
        return(
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{data.length}</div>
                <div>Количество обслуживающихся</div>
              </CardBody>
            </Card>
          </Col>
        )
      }else{
        return(
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">0</div>
                <div>Количество обслуживающихся</div>
              </CardBody>
            </Card>
          </Col>
        )
      }
    }else{
      return false;
    }
  }
  show(data){
    if(data){
      var scene = data.map(function(item,index){
      var img = '',
          sizeBlock=4,
          employeePicture = 'images/worker.png',
          employeeClass = 'cachier',
          tooltip='';
      item.worktitle === 'Кассир' ? img = 'images/c-table.png' : img = 'images/m-table.png';
      item.worktitle === 'Кассир' ? sizeBlock = 3 : sizeBlock = 4;
      item.worktitle === 'Кассир' ? employeePicture = 'images/worker.png' : employeePicture = 'images/worker-2.png';
      item.worktitle === 'Кассир' ? employeeClass = 'cachier' : employeeClass = 'manager';
      item.worktitle === 'Кассир' ? tooltip = 'cachier' : tooltip = 'manager';
        return (
          <Col key={index} xs={sizeBlock} sm={sizeBlock} md={sizeBlock}>
            {
              item.windows.map(function(window,ind){
                return(
                    <div onClick={() => {this.toggle(ind,tooltip)}} id={tooltip+window.windowid}  key={ind} className="window">
                      <div className={window.ticket.length>0 ? window.ticket[0].servover ? 'pulsating-circle primary' : window.ticket[0].preservover ? 'pulsating-circle warning' : 'pulsating-circle' : 'pulsating-circle'} ></div>
                      {
                        window.operator.length>0 ?
                          <div className='employeePicture'>
                            <img alt={"window-employee" + window.winno} className={employeeClass} src={employeePicture} />
                          </div>
                        :
                          false
                      }
                      <div className="winno">
                        <span>{window.winno}</span>
                      </div>

                      <img alt={"window" + window.winno} className='workTable' src={img}/>
                      {
                        window.ticket.length>0 ?
                          <div className="clientPicture">
                            <img alt={"client-"+window.ticket[0].ticketno} src={"images/people-2/H"+window.ticket[0].picnum+".png"}/>
                          </div>
                        :
                          false
                      }
                    </div>
                )
              },this,img)
            }
          </Col>
        )
      },this)
      return scene;
    }else{
      return false;
    }

  }
  showNewTicket(tickets){
    if(tickets){
      if(tickets.length>0){
        var scene = tickets.map(function(item,index){
          var sizeBlock=4,
              tooltip='';
          item.worktitle === 'Кассир' ? sizeBlock = 3 : sizeBlock = 4;
          item.worktitle === 'Кассир' ? tooltip = 'waitsCachier' : tooltip = 'waitsManager';
          return (
            <Col key={index} xs={sizeBlock} sm={sizeBlock} md={sizeBlock}>
                <div>
                  {
                    item.tickets.map(function(ticket,ind){
                      return(
                        <div onClick={() => {this.toggle(ind,tooltip)}} id={'clientWait'+ticket.eventid}  key={ind} className="clientWait">
                          <div className={ticket.waitover ? 'pulsating-circle primary' : ticket.prewaitover ? 'pulsating-circle warning' : 'pulsating-circle' }></div>
                          <img alt={"client-wait"+ticket.eventid} src={"images/people-2/H"+ticket.picnum+".png"}/>
                        </div>
                      )
                    },this)
                    }
                </div>
            </Col>
          )
        },this)
        return scene;
      }else{
        return false;
      }

    }else{
      return false;
    }

  }
  newTicketsList(data){
    if(data){
      const columns = [
        {
          title: 'Номер билета',
          dataIndex: 'ticketno',
          key: 'ticketno',
        },
        {
          title: 'Услуга',
          dataIndex: 'servicename',
          key: 'servicename'
        },
        {
          title: 'Время регистраций',
          dataIndex: 'starttime',
          key: 'starttime',
          render: (text) => {
            var hours = new Date((parseInt(text,10)/1000)*1000).getHours(),
                minutes = new Date((parseInt(text,10)/1000)*1000).getMinutes();
            if(hours === 6 && minutes === 0){
              return '--';
            }else{
              return hours + ":"  + minutes;
            }
          }
        },
        {
          title: 'Время ожидание',
          dataIndex: 'waitingConvert',
          key: 'waitingConvert',
          render: waitingConvert => waitingConvert,

        },
        {
          title: 'Статус',
          dataIndex: 'waitover',
          key: 'waitover',
          render: (waitover,rows) => {
            if(waitover){
              return (
                <span style={{color: '#ff2e00',transition: 'all .3s ease'}}>
                  &#x25cf;
                </span>
              );
            }else if (rows.prewaitover) {
              return (
                <span style={{color: '#ffc107',transition: 'all .3s ease'}}>
                  &#x25cf;
                </span>
              );
            }else{
              return (
                <span style={{color: '#57d500',transition: 'all .3s ease'}}>
                  &#x25cf;
                </span>
              );
            }
          }
        }
      ];
      return <Table pagination={false}  columns={columns} dataSource={data} />
    }else{
      return <h4>Билетов нет</h4>
    }

  }
  inserviceTicketsList(data){
    if(data){
      const columns = [
        {
          title: 'Номер билета',
          dataIndex: 'ticketno',
          key: 'ticketno',
        },
        {
          title: 'Услуга',
          dataIndex: 'servicename',
          key: 'servicename'
        },
        {
          title: 'Оператор',
          dataIndex: 'operator',
          key: 'operator'
        },
        {
          title: 'Время регистраций',
          dataIndex: 'starttime',
          key: 'starttime',
          render: (text) => {
            var hours = new Date((parseInt(text,10)/1000)*1000).getHours(),
                minutes = new Date((parseInt(text,10)/1000)*1000).getMinutes();
            if(hours === 6 && minutes === 0){
              return '--';
            }else{
              return hours + ":"  + minutes;
            }
          }
        },
        {
          title: 'Время начало обслуживание',
          dataIndex: 'startservtime',
          key: 'startservtime',
          render: (text) => {
            var hours = new Date((parseInt(text,10)/1000)*1000).getHours(),
                minutes = new Date((parseInt(text,10)/1000)*1000).getMinutes();
            if(hours === 6 && minutes === 0){
              return '--';
            }else{
              return hours + ":"  + minutes;
            }
          }
        },
        {
          title: 'Время ожидание',
          dataIndex: 'avgWaits',
          key: 'avgWaits',
          render: avgWaits => avgWaits,
        },
        {
          title: 'Время обслуживание',
          dataIndex: 'servConvert',
          key: 'servConvert',
          render: servConvert => servConvert,
        },
        {
          title: 'Статус',
          dataIndex: 'servover',
          key: 'servover',
          render: (servover,rows) => {
            if(servover){
              return (
                <span style={{color: '#ff2e00',transition: 'all .3s ease'}}>
                  &#x25cf;
                </span>
              );
            }else if (rows.preservover) {
              return (
                <span style={{color: '#ffc107',transition: 'all .3s ease'}}>
                  &#x25cf;
                </span>
              );
            }else{
              return (
                <span style={{color: '#57d500',transition: 'all .3s ease'}}>
                  &#x25cf;
                </span>
              );
            }
          }
        }
      ];
      return <Table pagination={false} columns={columns} dataSource={data} />
    }else{
      return <h4>Билетов нет</h4>
    }
  }
  render(){
    const timeConvert = (minute)=>{
      var num = minute;
      var hours = (num / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      if(rhours === 0){
        return "" + rminutes + " мин.";
      }else{
        return "" + rhours + " ч. " + rminutes + " мин.";
      }
    }
    return(
      <TabContent activeTab={this.props.activeTab}>
            {
              this.state.data ?
                <TabPane tabId="1">
                  <Row>
                    {
                      this.showWaitingCount(this.state.data.waits_ticket)
                    }
                    {
                      this.showServCout(this.state.data.serv_ticket)
                    }
                    {
                      this.showWaitingTime(this.state.data.waits_group)
                    }
                    {
                      this.showServTime(this.state.data.serv_group)
                    }
                  </Row>
                  {
                    this.state.data.windows ?
                      this.state.data.windows[0].windows.map(function(item,index){
                        return(
                          <Popover  key={index} placement="top" isOpen={this.state.tooltipCachierOpen[index]} target={'cachier'+item.windowid} toggle={() => {this.toggle(index,'cachier')}}>
                            <PopoverHeader>Номер окна: {item.winno}</PopoverHeader>
                            <PopoverBody>
                              Номер окна: {item.winno} <br/>
                              Роль окна: {item.worktitle} <br/>
                              {
                                item.operator.length>0 ?
                                  <span>
                                    ------Оператор----<br/>
                                    {item.operator[0].F_WORK_NAME} <br/>
                                  </span>
                                :
                                  false
                              }
                              {
                                item.ticket.length>0 ?
                                  <span>
                                    ------Билет----<br/>
                                    Номер билета: {item.ticket[0].ticketno} <br/>
                                    Услуга: {item.ticket[0].servicename} <br/>
                                    Время регистраций: {this.timeShow(item.ticket[0].starttime)} <br/>
                                    Время ожидания: {timeConvert(item.ticket[0].avgWaits)}<br/>
                                    Вызван: {this.timeShow(item.ticket[0].startservtime)} <br/>
                                    Время обслуживание: {timeConvert(item.ticket[0].serv)}
                                  </span>
                                :
                                  false
                              }
                            </PopoverBody>
                          </Popover>
                        )
                      },this)

                    :
                      false
                  }
                  {
                    this.state.data.windows ?
                      this.state.data.windows.length>1 ?
                        this.state.data.windows[1].windows.map(function(item,index){
                          return(
                            <Popover key={index} placement="top" isOpen={this.state.tooltipManagerOpen[index]} target={'manager'+item.windowid} toggle={() => {this.toggle(index,'manager')}}>
                              <PopoverHeader>Номер окна: {item.winno}</PopoverHeader>
                              <PopoverBody>
                                Номер окна: {item.winno} <br/>
                                Роль окна: {item.worktitle} <br/>
                                {
                                  item.operator.length>0 ?
                                    <span>
                                      ------Оператор----<br/>
                                      {item.operator[0].F_WORK_NAME} <br/>
                                    </span>
                                  :
                                    false
                                }
                                {
                                  item.ticket.length>0 ?
                                    <span>
                                      ------Билет----<br/>
                                      Номер билета: {item.ticket[0].ticketno} <br/>
                                      Услуга: {item.ticket[0].servicename} <br/>
                                      Время регистраций: {this.timeShow(item.ticket[0].starttime)} <br/>
                                      Время ожидания: {timeConvert(item.ticket[0].avgWaits)}<br/>
                                      Вызван: {this.timeShow(item.ticket[0].startservtime)} <br/>
                                      Время обслуживание: {timeConvert(item.ticket[0].serv)}
                                    </span>
                                  :
                                    false
                                }
                              </PopoverBody>
                            </Popover>
                          )
                        },this)
                      :
                        false
                    :
                      false
                  }
                  {
                    this.state.data.newtickets ?
                      this.state.data.newtickets[0].tickets.map(function(item,index){
                        return(
                          <Popover placement="top"  key={index} isOpen={this.state.tooltipWaitsCachierOpen[index]} target={'clientWait'+item.eventid} toggle={() => {this.toggle(index,'waitsCachier')}}>
                            <PopoverHeader>  Номер билета: {item.ticketno}</PopoverHeader>
                            <PopoverBody>
                              Время регистраций: {this.timeShow(item.starttime)} <br/>
                              Время ожидания: {item.waitingConvert}<br/>
                              Услуга: {item.servicename} <br/>
                            </PopoverBody>
                          </Popover>
                        )
                      },this)
                    :
                      false
                  }
                  {
                    this.state.data.newtickets ?
                      this.state.data.windows.length>1 ?
                        this.state.data.newtickets[1].tickets.map(function(item,index){
                          return(
                            <Popover placement="top"  key={index} isOpen={this.state.tooltipWaitsManagerOpen[index]} target={'clientWait'+item.eventid} toggle={() => {this.toggle(index,'waitsManager')}}>
                              <PopoverHeader>  Номер билета: {item.ticketno}</PopoverHeader>
                              <PopoverBody>
                                Время регистраций: {this.timeShow(item.starttime)} <br/>
                                Время ожидания: {item.waitingConvert}<br/>
                                Услуга: {item.servicename} <br/>
                              </PopoverBody>
                            </Popover>
                          )
                        },this)
                      :
                        false
                    :
                      false
                  }
                  <Card className="monitoring" style={{backgroundImage: 'url("images/large.png")'}}>
                    <CardBody >
                        <Row className='employeeRoom'>
                          {this.show(this.state.data.windows)}
                        </Row>
                        <Row className='waitingRoom'>
                          {this.showNewTicket(this.state.data.newtickets)}
                        </Row>
                    </CardBody>
                  </Card>
                </TabPane>
              :
                <Card className="monitoring" style={{backgroundImage: 'url("images/large.png")'}}>
                  <CardBody >
                      <Row className='employeeRoom'>

                      </Row>
                      <Row className='waitingRoom'>
                      </Row>
                  </CardBody>
                </Card>
            }
          <TabPane tabId="2">
            {
              this.state.data ?
                <div>
                  {this.newTicketsList(this.state.data.waits_ticket)}
                </div>
              :
                false
            }
          </TabPane>
          <TabPane tabId="3">
            {
              this.state.data ?
                this.inserviceTicketsList(this.state.data.serv_ticket)
              :
                false
            }
          </TabPane>
      </TabContent>
    )
  }
}
export default ScenePicture;
