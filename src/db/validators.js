const z = require("zod");

async function leadValidator(postData) {
  const lead = z.object({
    email: z.string().email(),
  });

  let validData;
  let hasError;
  let message;
  
  try {
    validData = lead.parse(postData);
    hasError = false;
    message = '';
  } catch (error) {
    hasError = true;
    message = 'Invalid Email, Please try again!';
  }
  return {
    data: validData,
    hasError: hasError,
    message: message
  };
}

module.exports.leadValidator = leadValidator;
