import { model, Schema } from 'mongoose'

export const User = model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pushToken: {
    type: String,
    required: true
  },
  localization: {
    type: [{
      coords: {
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
        },
        required: true
      }
    }],
    required: true
  }
}))
