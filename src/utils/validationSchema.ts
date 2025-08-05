export const createUserValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "Email cannot be empty.",
    },
    isEmail: {
      errorMessage: "Invalid email format.",
    },
    normalizeEmail: true,
  },

  userName: {
    trim: true,
    notEmpty: {
      errorMessage: "Username cannot be empty.",
    },

    isString: {
      errorMessage: "Username must be a string.",
    },
    isLength: {
      options: {
        min: 4,
        max: 25,
      },
      errorMessage:
        "Username must be at least 4 characters with a max of 25 charachters.",
    },
    escape: true,
  },

  phoneNumber: {
    optional: true,
    isString: {
      errorMessage: "Phone number must be a string.",
    },
    isLength: {
      options: {
        min: 10,
        max: 15,
      },
      errorMessage: "Phone number must be 10-15 characters.",
    },
  },

  imageUrl: {
    optional: true,
    isString: {
      errorMessage: "Image URL must be a string.",
    },
    isURL: {
      errorMessage: "Invalid URL format.",
    },
  },
};
