exports.handler = async (event) => {
    const { name, email, message } = JSON.parse(event.body);
    console.log(name)
    // Do something with the form data, such as send it to a database or send an email
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Form submitted successfully!' }),
    };
};