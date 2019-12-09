import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu,UncontrolledDropdown, DropdownToggle, Nav, NavItem, NavLink,Progress  } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};
class DefaultHeader extends Component {
  constructor(props){
    super(props)
    this.logOut = this.logOut.bind(this)
  }
  logOut(){
    sessionStorage.removeItem('nomad_auth');
    window.location.href = '/login'
  }
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 55, height: 'auto', alt: 'KGD Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'KGD Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/analytics">Аналитика</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/monitoring">Мониторинг</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          {
            this.props.ten_minute_waits ?
                <UncontrolledDropdown>
                  <AppHeaderDropdown direction="down">

                        <DropdownToggle nav>
                          <i className="icon-clock"></i><Badge pill color="danger">{this.props.ten_minute_waits}%</Badge>
                        </DropdownToggle>

                    <DropdownMenu right style={{ right: 'auto', }}>
                      <DropdownItem header tag="div" className="text-center"><strong>Доля ожидания клиентов менее 10 минут</strong></DropdownItem>
                      <DropdownItem>
                        <div className="text-center">{this.props.ten_minute_waits}%</div>
                        <Progress value={this.props.ten_minute_waits} />
                      </DropdownItem>
                    </DropdownMenu>

                  </AppHeaderDropdown>
                </UncontrolledDropdown>
            :
              false
          }
          {
            this.props.alarm_notification ?
                <UncontrolledDropdown>
                  <AppHeaderDropdown direction="down">

                            <DropdownToggle nav>
                              <i className="icon-bell"></i><Badge pill color="danger">{this.props.alarm_notification.length}</Badge>
                            </DropdownToggle>

                      <DropdownMenu right style={{ right: 'auto', }}>
                      {
                        this.props.alarm_notification.length>0
                        ?
                        <div>
                          <DropdownItem header tag="div" className="text-center"><strong>Просроченные билеты</strong></DropdownItem>
                            {
                              this.props.alarm_notification.slice(0, 5).map(function(item,index){
                                return(
                                  <DropdownItem key={index}>
                                      <NavLink href="/alarm">
                                        <div className="message">
                                          <div>
                                            <small className="text-muted">Номер билета</small>
                                            <small className="text-muted float-right mt-1">{item.ticketno}</small>
                                          </div>
                                          <div className="text-truncate font-weight-bold">{item.branch_name} {item.branch_parent_name ? `(${item.branch_parent_name})` : false}</div>
                                          <small className="text-muted">Услуга: {item.servicename}</small>
                                        </div>
                                      </NavLink>
                                  </DropdownItem>
                                )

                              })
                            }
                          <DropdownItem onClick={()=>this.props.history.push('/alarm')} tag="div" className="text-center"><strong>Все билеты</strong></DropdownItem>
                          </div>
                        :
                          <DropdownItem>
                            <div className="message">
                              <div className="text-truncate font-weight-bold">Просроченные билеты пусто</div>
                            </div>
                          </DropdownItem>

                      }
                      </DropdownMenu>
                  </AppHeaderDropdown>
                </UncontrolledDropdown>
            :
              false
          }
          <UncontrolledDropdown>
              <AppHeaderDropdown direction="down">
                <DropdownToggle nav>
                  <img src={window.location.origin +'/assets/img/avatars/10.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                </DropdownToggle>
                <DropdownMenu right style={{ right: 'auto' }}>
                  <DropdownItem header tag="div" className="text-center"><strong>Пользователь</strong></DropdownItem>
                  {
                    this.props.user.status ?
                      <DropdownItem><i className="fa fa-user"></i> {this.props.user.data[0].login}</DropdownItem>
                    :
                      false
                  }
                  <DropdownItem onClick={this.logOut}><i className="fa fa-lock"></i> Выйти</DropdownItem>
                </DropdownMenu>

              </AppHeaderDropdown>
          </UncontrolledDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}
DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
