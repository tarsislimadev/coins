import { HTML } from '../libs/@brtmvdl/frontend/src/index.js'
import * as UTILS from '../utils.js'

export class DatetimeHTML extends HTML {
  state = {
    datetime: 0,
  }

  children = {
    datetime: new HTML(),
  }

  onCreate() {
    this.append(this.getDatetimeHTML())
  }

  getDatetimeHTML() {
    this.children.datetime.setStyle('padding', '1rem 0rem')
    this.children.datetime.setStyle('text-align', 'center')

    return this.children.datetime
  }

  getDatetimeText(now = Date.now()) {
    const datetime = new Date(now)

    const date = [
      datetime.getFullYear(),
      datetime.getMonth() + 1,
      datetime.getDay(),
    ].map((num) => UTILS.padLeft(num, 2, '0')).join('-')

    const time = [
      datetime.getHours(),
      datetime.getMinutes(),
      datetime.getSeconds(),
    ].map((num) => UTILS.padLeft(num, 2, '0')).join(':')

    return [date, time].join(' ')
  }

  updateDatetime() {
    this.children.datetime.setText(this.getDatetimeText(
      this.state.datetime = Date.now()
    ))
  }
}
