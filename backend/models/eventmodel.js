// const { dark } = require('@material-ui/core/styles/createPalette');
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventId: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    imgUrl: { type: String, required: true },
    date: { type: String, required: true }, // Renamed from startdate to date, and made required
    enddate: { type: String, required: true },
    venue: { type: String, enum: ['Online', 'Offline', 'Hybrid'], required: true }, // Added type with enum and required
    prizes: { type: [String], default: [] },
    "createdAt": Date,
    scheduleDetails: {
        type: [{
            date: { type: String, required: true },
            event: { type: String, required: true },
            time: { type: String, required: true },
        }],
        required: true,
        default: [] // Added default value
    },
    logistics: String,
    importantDates: { type: [String], required: true, default: [] }, // Added important dates and default value
});
// const eventSchema = new mongoose.Schema({
//     eventId: {type: String,required:  true},
//     title: {type: String,required: true},
//     desc : {type: String,required: true},
//     imgUrl: {type: String,required: true},
//     date : {type: String,required: true}, // Renamed from startdate to date, and made required
//     enddate:{type: String,required: true},
//     venue : {type: String,enum: ['Online', 'Offline', 'Hybrid'],required: true}, // Added type with enum and required
//     prizes: {type: [String],default: []},
//     // tracks: {type: [String],default: []},  // Added prizes as an array of strings, default to empty array
//     //schedule: {type: String,required: true}, // Added schedule and made required
//     scheduleDetails: {
//         type: [{
//             date: {type: String,required: true},
//             event: {type: String,required: true},
//             time: {type: String,required: true},
//         }],
//         required: true,
//     },
//     // importantdates: [{
//     //     name : {type: String,required: true},
//     //     date: {type: String,required: true},
//     // }]
//     importantdates: {type: [String],required: true}, //added important dates
//     // startdate:
//     // type
//     // prize
// })

module.exports = mongoose.model('event', eventSchema);

// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   eventId: { type: String, required: true },
//   title: { type: String, required: true },
//   desc: { type: String, required: true },
//   imgUrl: { type: String, required: true },
//   date: { type: String, required: true }, // Renamed from startdate to date, and made required
//   type: { type: String, enum: ['Online', 'Offline', 'Hybrid'], required: true }, // Added type with enum and required
//   prizes: { type: [String], default: [] }, // Added prizes as an array of strings, default to empty array
//   tracks: { type: [String], required: true }, // Added tracks as an array of strings, made required
//   schedule: { type: String, required: true }, // Added schedule and made required
//   scheduleDetails: {
//     type: [{
//       date: { type: String, required: true },
//       event: { type: String, required: true },
//       time: { type: String, required: true },
//     }],
//     required: true,
//   },
//   importantdates: { type: [String], required: true } //added important dates
// });

// module.exports = mongoose.model('event', eventSchema);