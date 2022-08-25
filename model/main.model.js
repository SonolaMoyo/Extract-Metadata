import mongoose from 'mongoose';

const savedData = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      index: true,
    },
    originalName: {
      type: String,
    },
    size: {
      type: Number,
    },
    information: {
      type: Object,
    },
  },
  { timestamps: true }
);

const DataModel = mongoose.model('Metadata', savedData);

export default { DataModel };
