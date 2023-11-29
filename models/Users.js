const mongoose = require("mongoose"),
  bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    fullName: {
      fname: {
        type: String,
      },
      mname: {
        type: String,
        trim: true,
      },
      lname: {
        type: String,
      },
      suffix: {
        type: String,
      },
    },
    address: {
      isSame: {
        type: Boolean,
        default: true,
      },
      current: {
        street: {
          type: String,
          trim: true,
        },
        barangay: {
          type: String,
          trim: true,
        },
        city: {
          type: String,
        },
        province: {
          type: String,
        },
        region: {
          type: String,
        },
        zip: {
          type: String,
          trim: true,
        },
      },
      permanent: {
        street: {
          type: String,
          trim: true,
        },
        barangay: {
          type: String,
          trim: true,
        },
        city: {
          type: String,
          trim: true,
        },
        province: {
          type: String,
          trim: true,
        },
        region: {
          type: String,
          trim: true,
        },
        zip: {
          type: String,
          trim: true,
        },
      },
    },
    civilStatus: {
      type: String,
      enum: {
        values: ["single", "married", "live-in", "widowed"],
        message: "Please choose a valid type from the predefined options.",
      },
      default: "single",
    },
    guardians: {
      father: {
        fname: {
          type: String,
          trim: true,
        },
        lname: {
          type: String,
          trim: true,
        },
        mname: {
          type: String,
          trim: true,
        },
        suffix: {
          type: String,
          trim: true,
        },
        mobile: {
          type: String,
          trim: true,
        },
      },
      mother: {
        fname: {
          type: String,
          trim: true,
        },
        lname: {
          type: String,
          trim: true,
        },
        mname: {
          type: String,
          trim: true,
        },
        suffix: {
          type: String,
          trim: true,
        },
        mobile: {
          type: String,
          trim: true,
        },
      },
      legal: {
        fname: {
          type: String,
          trim: true,
        },
        lname: {
          type: String,
          trim: true,
        },
        mname: {
          type: String,
          trim: true,
        },
        suffix: {
          type: String,
          trim: true,
        },
        mobile: {
          type: String,
          trim: true,
        },
      },
    },
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    lrn: {
      type: String,
    },
    psa: {
      type: String,
    },
    motherTongue: {
      type: String,
    },
    indigenousPeople: {
      type: String,
    },
    "4ps": {
      type: String,
    },
    disability: {
      type: String,
    },
    dob: {
      type: String,
    },
    pob: {
      type: String,
    },
    mobile: {
      type: String,
    },
    isMale: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deactivated: {
      by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      at: {
        type: String,
      },
      for: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Violations",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
