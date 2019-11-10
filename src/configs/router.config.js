
import layout from '../layout/layout.vue'

export const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/projectlist',
        props: { tabbar: true,  activetab: 'home'},
        component: layout,
        children: [
            {
                path: '/projectlist',
                name: 'projectlist',
                meta: {title: '永爱·项目管理'},
                component: () => import('../views/Home/Index.vue')
            }
        ]
    },
    {
        path: '/mission',
        name: 'mission',
        props: { tabbar: true,   activetab: 'missionList'  },
        component: layout,
        children: [
            {
                path: '/missionList',
                name: 'missionList',
                meta: {title: '永爱·任务管理',btn:{Icon: 'plus', Path: '/MissionAdd',}},
                component: () => import('../views/Mission/Index.vue')
            }
        ]
    },
    {
        path: '/report',
        name: 'report',
        props: { tabbar: true,  activetab: 'ReportForms' },
        component: layout,
        children: [{
            path:'/ReportForms',
            name:'ReportForms',
            meta: {title: '永爱·我的报表',},
            component:()=>import('../views/ReportForms/Index.vue')

        }]
    },
    {
        path: '/message',
        name: 'message',
        props: { tabbar: true,  activetab: 'Information' },
        component: layout,
        children: [{
            path:'/Information',
            name:'Information',
            meta: {title: '永爱·提醒',},
            component:()=>import('../views/Information/Index.vue')
        }]
    },
    {
        path: '/projectdetails',
        name: 'projectdetails',
        redirect: '/projectdetails/index',
        props: { tabbar: false ,},
        component: layout,
        children: [
            {
                path: '/projectdetails/index',
                name: 'projectdetailsIndex',
                meta:{title: '项目详情',keepalive:true},
                component: () => import('../views/ProjectDetail/Index.vue')
            }

        ]

    },
    {
        path: '/PDMaintain',
        name: 'PDMaintain',
        redirect: '/PDMaintain/index',
        component:layout,
        children: [
            {
                path: '/PDMaintain/index',
                name: 'PDMaintainIndex',
                meta:{title: '项目阶段维护',keepalive:true},
                component: () => import('../views/ProjectDetail/Components/PDMaintain.vue')
            }

        ]

    },
    {
        path: '/MissionAdd',
        name: 'MissionAdd',
        props: { tabbar: false, rightIcon: 'wap-home', rightPath: '/home', },
        redirect: '/MissionAdd/index',
        component: layout,
        children: [
            {
                path: '/MissionAdd/index',
                name: 'MissionAdd',
                meta:{title: '新建任务', },
                component: () => import('../views/Mission/Components/MissionAdd.vue')
            }
        ]

    },
    {
        path: '/MissionEdit',
        name: 'MissionEdit',
        props: { tabbar: false,  rightIcon: 'wap-home', rightPath: '/home' ,},
        redirect: '/MissionEdit/index',
        component: layout,
        children: [{
            path: '/MissionEdit/index',
            name: 'MissionEdit',
            meta:{title: '汇报任务',},
            component:()=>import('../views/Mission/Components/MissionEdit.vue')
        }]
    }

]