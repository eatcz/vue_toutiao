import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh';

/**
 * 
 * @param {*} targetTime 
 * @returns 
 */

export const timeAgo = (targetTime) =>{
    dayjs.extend(relativeTime)
    dayjs.locale('zh')
    var a = dayjs()
    var b = dayjs(targetTime)
    return a.to(b)
}
