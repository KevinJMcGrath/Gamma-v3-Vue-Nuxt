import Vue from 'vue'
import iView from 'iview'
const moment = require('moment')

console.log(moment().format('MM-DD-YYYY HH:mm:ss.SSS Z') + ' | iview plugin loading (server)')

Vue.use(iView);
