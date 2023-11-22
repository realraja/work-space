const { Schema, default: mongoose } = require("mongoose");

const WorkSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  abcId: {
    type: String,
    require: true,
  },
  form: {
    type: String,
    require: true,
  },
  money:String,
  
    date:[],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Work = mongoose.models.WS_Work || mongoose.model("WS_Work", WorkSchema);

export default Work;
