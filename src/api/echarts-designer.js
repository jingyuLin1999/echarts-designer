import request from '@/components/Echarts/utils/http';

export function getReportList(params) {
  return request({
    url: '/manage/report/getReportList.do',
    method: 'get',
    params
  })
}

export function getChartTree(data) {
  return request({
    url: '/manage/report/getChartsTree.do',
    method: 'post',
    data
  })
}

export function getReportTree(data) {
  return request({
    url: '/manage/report/getReportTree.do',
    method: 'post',
    data
  })
}

export function submitCharts(data) {
  return request({
    url: '/manage/report/submitCharts.do',
    method: 'post',
    data
  })
}

export function submitReport(data) {
  return request({
    url: '/manage/report/submitReport.do',
    method: 'post',
    data
  })
}