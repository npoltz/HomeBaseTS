import { Schema } from "mongoose";
import { convertTicksToDate } from "../../helpers/date-time-helper";

const DataLogSchema = new Schema({
    SensorId: String,
    Timestamp: [Number],
    Temperature: Number,
    RelativeHumidity: Number
},
{
    toJSON: {
        transform: function(doc, ret){
            ret.Timestamp = convertTicksToDate(doc.Timestamp);
            return ret;
        }
    }
});

export default DataLogSchema;