import  TimeAgo   from "javascript-time-ago";
import vi from 'javascript-time-ago/locale/vi'

TimeAgo.addDefaultLocale(vi)
const timeAgo = new TimeAgo('vi-VI')

export default function getTimeAgo(timestamp){
    return timeAgo.format(new Date(timestamp)) === "bây giờ" ? "vừa xong" :  timeAgo.format(new Date(timestamp));
}
