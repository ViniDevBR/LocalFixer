import { model, Schema } from 'mongoose'

export const User = model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    enum: ['Tecnico', 'Analista'],
    default: 'Tecnico',
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  pushToken: {
    type: String,
    required: true,
    unique: true,
  },
  localization: {
    type: [{
      altitude: {
        type: Number,
        required: true
      },
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
      timestamp: {
        type: String,
        required: true
      }
    }],
    required: true
  }
}))
