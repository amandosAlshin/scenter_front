import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
var _ = require('lodash');
class Alarm extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }
  componentWillMount(){
    if(this.props.alarm_list){
      this.setState({
          data: this.props.alarm_list
      })
    }
  }
  componentWillReceiveProps(props){
    if(props.alarm_list){
      this.setState({
          data: props.alarm_list
      })
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(() => {
        this.props.ticketList(this.props.history,{data: this.props.tickets});
    }, 30000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Alarm
              </CardHeader>
              <CardBody>
              {
                this.state.data ?
                  <ReactTable
                  filterable
                  data={this.state.data}
                  columns={
                    [
                     {
                       Header: 'Номер билета',
                       accessor: 'ticketno'
                     },
                     {
                       Header: 'Отделение',
                       id: "branch_name",
                       accessor: "branch_name",
                       filterMethod: (filter, row) => _.includes(_.lowerCase(row.branch_name), _.lowerCase(filter.value))
                     },
                     {
                       Header: 'Статус',
                       id: "state",
                       accessor: d => d.state === 'NEW' ? 'ожидают' : 'обслуживается',
                       filterMethod: (filter, row) => _.includes(row.state, _.lowerCase(filter.value))
                     },
                     {
                       Header: 'Услуга',
                       accessor: 'servicename',
                       filterMethod: (filter, row) => _.includes(_.lowerCase(row.servicename), _.lowerCase(filter.value))
                     },
                     {
                       Header: 'Время регистрации',
                       accessor: 'starttime'
                     },
                     {
                       Header: 'Время ожидания',
                       accessor: 'waiting',
                       Cell: (row) => {
                         return(
                           <span>
                             <span style={{
                               color: row.row._original.waitover === true ? '#ff2e00'
                                 : '#57d500',
                               transition: 'all .3s ease'
                             }}>
                               &#x25cf;
                             </span> {
                               row.row._original.waitingConvert
                             }
                           </span>
                        )
                      },
                      filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                          return true;
                        }
                        if (filter.value === "true") {
                          return row._original.waitover === true;
                        }
                        return row._original.waitover === false;
                      },
                      Filter: ({ filter, onChange }) =>
                        <select
                          onChange={event => onChange(event.target.value)}
                          style={{ width: "100%" }}
                          value={filter ? filter.value : "all"}
                        >
                          <option value="all">Все</option>
                          <option value="true">вне норматива</option>
                          <option value="false">в нормативе</option>
                        </select>
                     },
                    ]
                   }
                    defaultPageSize={25}
                    className="-striped -highlight"
                    previousText='Предыдущий'
                    nextText='Следующий'
                    loadingText = 'Загрузка...'
                    noDataText = 'Не найдено строк'
                    pageText = 'Страница'
                    ofText = 'из'
                    rowsText = 'строки'
                  />
                :
                  false
              }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Alarm;
