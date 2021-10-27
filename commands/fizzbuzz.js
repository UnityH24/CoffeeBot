module.exports = {
    name: "fizzbuzz",
    description: "Play the game of FizzBuzz!",
    execute(message, args) {
        reply = "```js\n";
        for (var i = 1; i <= 100; ++i) {
            var f = i % 3 == 0, b = i % 5 == 0;
            reply += `${f ? (b ? "FizzBuzz" : "Fizz") : (b ? "Buzz" : i)}\n`;
        }
        reply += "```";

        message.reply(reply)
    }
}