import { param } from "express-validator";
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

export const getOneByIdValidationSchema = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .isUUID()
    .withMessage("ID must be a valid UUID")
    .trim(),
];

export const createListingValidationSchema = {
  title: {
    notEmpty: {
      errorMessage: "Title cannot be empty.",
    },
    isString: {
      errorMessage: "Title must be a string.",
    },
    isLength: {
      options: {
        min: 5,
        max: 100,
      },
      errorMessage: "Title must be between 5 and 100 characters.",
    },
    trim: true,
    escape: true,
  },
  price: {
    notEmpty: {
      errorMessage: "Price cannot be empty.",
    },
    isFloat: {
      options: { min: 0.01 },
      errorMessage: "Price must be a positive number.",
    },
  },

  description: {
    notEmpty: {
      errorMessage: "Description cannot be empty.",
    },
    isString: {
      errorMessage: "Description must be a string.",
    },
    isLength: {
      options: {
        min: 10,
        max: 1000,
      },
      errorMessage: "Description must be between 10 and 1000 characters.",
    },
    trim: true,
    escape: true,
  },

  categoryId: {
    notEmpty: {
      errorMessage: "Category ID cannot be empty.",
    },
    isUUID: {
      errorMessage: "Category ID must be a valid UUID.",
    },
  },
};

export const createListingPhotoValidationSchema = {
  listingId: {
    notEmpty: {
      errorMessage: "Listing ID cannot be empty.",
    },
    isUUID: {
      errorMessage: "Listing ID must be a valid UUID.",
    },
  },

  imgUrl: {
    notEmpty: {
      errorMessage: "Photo URL cannot be empty.",
    },
    isString: {
      errorMessage: "Photo URL must be a string.",
    },
    isURL: {
      errorMessage: "Invalid URL format.",
    },
  },
};
