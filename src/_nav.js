export default {
  items: [
    {
      name: 'Аналитика',
      url: '/analytics',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      },
    },
    {
      title: true,
      name: 'Билеты',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Сотрудники',
      url: '/employee',
      icon: 'icon-people',
    },
    {
      name: 'Показатели',
      url: '/infobranch',
      icon: 'icon-graph',
    },
    {
      name: 'Пиковые часы',
      url: '/peak-clock',
      icon: 'icon-clock',
    },
    {
      name: 'Мониторинг',
      url: '/monitoring',
      icon: 'icon-eyeglass',
    },
    {
      name: 'Alarm',
      url: '/alarm',
      icon: 'icon-bell',
      badge: {
        variant: 'info'
      },
    },
    {
      title: true,
      name: 'Пользователи',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: 'users-title'             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Список',
      url: '/user/user-list',
      icon: 'icon-user',
    },
    {
      title: true,
      name: 'NOMAD',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      }          // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Камеры',
      url: '/camera/camera-list',
      icon: 'icon-layers',
    },
    {
      name: 'Серверы',
      url: '/nomad/server-list',
      icon: 'icon-layers',
    },
  ],
};
