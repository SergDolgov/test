import axios from 'axios'

const API_URL = 'http://localhost:8080/api/time_tables';

class TimeTableService {

    getAllTimeTables() {
        console.log("service timeTables : get all");
        return axios.get(API_URL);
    }

    getTimeTableById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    createTimeTable(timeTableDTO) {
        return axios.post(`${API_URL}`, timeTableDTO);
    }

    updateTimeTable(id, timeTableDTO) {
        return axios.put(`${API_URL}/${id}`, timeTableDTO);
    }

    getDayOfWeekNumber(dayOfWeekText) {
         const daysOfWeek = [
             'SUNDAY',
             'MONDAY',
             'TUESDAY',
             'WEDNESDAY',
             'THURSDAY',
             'FRIDAY',
             'SATURDAY',
         ];

         return daysOfWeek.indexOf(dayOfWeekText);
     }

}

export default new TimeTableService()