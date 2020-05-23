const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the Bootcamp name"],
    trim: true,
    unique: true,
    maxlength: [50, "The max length of the Bootcamp name is 50. Exceeded"],
  },
  slug: String,
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "The max length of the description is 50. Exceeded"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  phone: {
    type: String,
    maxlength: [20, "The max length of the phone is 50. Exceeded"],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

Schema.pre("save", async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

Schema.pre("save", async function (next) {
  const [
    {
      longitude,
      latitude,
      streetName,
      city,
      state,
      stateCode,
      zipcode,
      countryCode,
      formattedAddress,
    },
  ] = await geocoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [longitude, latitude],
    formattedAddress,
    street: streetName,
    city,
    state: stateCode,
    zipcode,
    country: countryCode,
  };

  this.address = undefined;

  next();
});

module.exports = mongoose.model("Bootcamp", Schema);
