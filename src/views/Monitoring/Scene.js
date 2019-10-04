import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';
class Scene extends Component {
  constructor(props){
    super(props)
    this.show = this.show.bind(this)
  }
  showWaitingTime(data){
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
      return false;
    }
  }
  showServTime(data){
    if(data.length>0){
      return(
        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <div className="text-value">{data[0].servConvert}</div>
              <div>Среднее времяforte обслуживания</div>
            </CardBody>
          </Card>
        </Col>
      )
    }else{
      return false;
    }
  }
  showWaitingCount(data){
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
  }
  showServCout(data){
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
  }
  show(data){
    var scene = data.map(function(item,index){
      return (
        <Col key={index} xs="12" sm="12" md="12">
          <Card>
              <CardHeader>
                {item.worktitle}
              </CardHeader>
              <CardBody>
                <Row>
                  {
                    item.windows.map(function(window){
                      return(
                        <Col key={window.id} xs="12" sm="4" md="4">
                          {
                            <Card className={window.ticket.length>0 ? window.ticket[0].servover ? 'bg-primary' : window.ticket[0].preservover ? 'bg-warning' : 'bg-info' : ''}>
                                <CardHeader>
                                  № {window.winno}
                                </CardHeader>
                                <CardBody>
                                  {window.operator.length>0 ? window.operator[0].F_WORK_NAME: 'Нет оператора'}
                                  {
                                    window.ticket.length>0 ?
                                      <div>
                                        Обслуживаеться билет номером {window.ticket[0].ticketno} <br />
                                        Время обслуживание {window.ticket[0].serv} <br />
                                        Услуга {window.ticket[0].servicename}
                                      </div>
                                    :
                                    false
                                  }
                                </CardBody>
                            </Card>
                          }
                        </Col>
                      )
                    },this)
                  }
              </Row>
            </CardBody>
          </Card>
        </Col>
      )
    },this)
    return scene;
  }
  showNewTicket(tickets){
    var scene = tickets.map(function(item,index){
      return (
        <Col key={index} xs="12" sm="12" md="12">
          <Card>
              <CardHeader>
                {item.worktitle}
              </CardHeader>
              <CardBody>
                <Row>
                  {
                    item.tickets.map(function(ticket){
                      return(
                        <Col key={ticket.eventid} xs="12" sm="4" md="4">
                          {
                            <Card className={ticket.waitover ? 'bg-primary' : ticket.prewaitover ? 'bg-warning' : 'bg-info'}>
                              <CardHeader>
                                № {ticket.ticketno}
                              </CardHeader>
                              <CardBody>
                                Услуга {ticket.servicename}
                              </CardBody>
                            </Card>
                          }
                        </Col>
                      )
                    })
                  }
              </Row>
            </CardBody>
          </Card>
        </Col>
      )
    })
    return scene;
  }
  newTicketsList(data){
    if(data.length>0){
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
          dataIndex: 'waiting',
          key: 'waiting',
          render: waiting => waiting,
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
    if(data.length>0){
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
          dataIndex: 'serv',
          key: 'serv',
          render: serv => serv,
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
    return(
      <TabContent activeTab={this.props.activeTab}>
            {
              this.props.data ?
                <TabPane tabId="1">
                  <Row>
                    {
                      this.showWaitingCount(this.props.data.waits_ticket)
                    }
                    {
                      this.showServCout(this.props.data.serv_ticket)
                    }
                    {
                      this.showWaitingTime(this.props.data.waits_group)
                    }
                    {
                      this.showServTime(this.props.data.serv_group)
                    }

                  </Row>
                  <Card>
                    <CardBody>
                        {this.show(this.props.data.windows)}
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                        {this.showNewTicket(this.props.data.newtickets)}
                    </CardBody>
                  </Card>
                </TabPane>
              :
                false
            }
          <TabPane tabId="2">
            {
              this.props.data ?
                this.newTicketsList(this.props.data.waits_ticket)
              :
                false
            }
          </TabPane>
          <TabPane tabId="3">
            {
              this.props.data ?
                this.inserviceTicketsList(this.props.data.serv_ticket)
              :
                false
            }
          </TabPane>
      </TabContent>
    )
  }
}
export default Scene;
