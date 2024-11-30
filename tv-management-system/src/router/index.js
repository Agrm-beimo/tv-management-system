import Vue from 'vue';
import Router from 'vue-router';
import EmployeeList from '@/components/EmployeeList.vue';
import ChannelList from '@/components/ChannelList.vue';
import AdvertisementList from '@/components/AdvertisementList.vue';
import StudioList from '@/components/StudioList.vue';
import ChannelAdManagement from '@/components/ChannelAdManagement.vue';
import ChannelStudioManagement from '@/components/ChannelStudioManagement.vue';
import ChannelStaffManagement from '@/components/ChannelStaffManagement.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/employees', component: EmployeeList },
    { path: '/channels', component: ChannelList },
    { path: '/advertisements', component: AdvertisementList },
    { path: '/studios', component: StudioList },
    { path: '/channel-ads', component: ChannelAdManagement },
    { path: '/channel-studios', component: ChannelStudioManagement },
    { path: '/channel-staff', component: ChannelStaffManagement },
  ],
});
