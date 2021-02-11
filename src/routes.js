import {MainCont} from './containers/Main';
import {LayoutCont} from './containers/Layout';
import {EmployeeCont} from './containers/Employee';
import {PeakclockCont} from './containers/Peakclock';
import {InfobranchCont} from './containers/Infobranch';
import {AlarmCont} from './containers/Alarm';
import {MonitoringCont} from './containers/Monitoring';

import {UseraddCont} from './containers/Useradd';
import {UsersCont} from './containers/Users';
import {UserCont} from './containers/User';

import {CameraaddCont} from './containers/Cameraadd';
import {CamersCont} from './containers/Camers';

import {CameraCont} from './containers/Camera';

import {BranchDetailCont,BranchChildCont,BranchDetailChildTableCont} from './containers/Detail/BranchDetail';
import {QueueDetailChildTableCont,QueueDetailCont,QueueChildCont} from './containers/Detail/QueueDetail';
import {StateDetailCont} from './containers/Detail/StateDetail';
import {ServersCont} from './containers/Nomad/Server';
//import MonitoringWorking from './views/Monitoring/Working';
const routes = [
  { path: '/', exact: true, name: 'Главная', component: LayoutCont },
  { path: '/analytics', name: 'Аналитика', component: MainCont },
  { path: '/employee', name: 'Операторы', component: EmployeeCont },
  { path: '/infobranch', name: 'Показатели', component: InfobranchCont },
  { path: '/peak-clock', name: 'Пиковые часы', component: PeakclockCont },
  { path: '/alarm', name: 'Alarm', component: AlarmCont },
  { path: '/monitoring', name: 'Мониторинг', component: MonitoringCont },

  { path: '/user/user-list', exact: true,  name: 'Пользователи', component: UsersCont },
  { path: '/user/user-list/:id', name: 'Пользователь', component: UserCont },
  { path: '/user/user-add', name: 'Добавить пользователя', component: UseraddCont },

  { path: '/camera/camera-list', exact: true,  name: 'Камеры', component: CamersCont },
  { path: '/camera/camera-add', name: 'Добавить камеру', component: CameraaddCont },
  { path: '/camera/camera-watch/:id', name: 'Камера', component: CameraCont },

  { path: '/detail/branch/:type/:data/',exact: true, name: 'Билеты по филиалам', component: BranchDetailCont },
  { path: '/detail/branch-child/:filial/:type/:data', name: 'Билеты по услугам', component: BranchChildCont },
  { path: '/detail/branch-table-child/:filial/:type/:data', name: 'Билеты по услугам', component: BranchDetailChildTableCont },

  { path: '/detail/queue-table-child/:branch/:queue/:type/:data', name: 'Билеты по услугам', component: QueueDetailChildTableCont },
  { path: '/detail/queue-parent/:branch/:type/:data', name: 'Билеты по услугам', component: QueueDetailCont },
  { path: '/detail/queue-child/:branch/:type/:data', name: 'Билеты по услугам', component: QueueChildCont },
  { path: '/detail/state/:type/:data', name: 'Общие показатели по электронной очереди', component: StateDetailCont },


  { path: '/nomad/server-list',exact: true,   name: 'Серверы Nomad', component: ServersCont },
];

export default routes;
