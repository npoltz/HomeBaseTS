import { Schema, Types } from "mongoose";
import { convertTicksToDate } from "../../helpers/date-time-helper";

const DataLogSchema = new Schema({
    Id: {
        type: String,
        default: Types.ObjectId()
    },
    SensorId: String,
    Timestamp: [Number],
    Temperature: Number,
    RelativeHumidity: Number
},
{
    toJSON: {
        transform: function(doc, ret){
            ret.Id = ret._id;
            delete ret._id;
            ret.Timestamp = convertTicksToDate(doc.Timestamp);
            return ret;
        }
    }
});

export default DataLogSchema;