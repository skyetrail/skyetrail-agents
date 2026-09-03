Write the prompt and the caller side for handling the messages that arrive in our support inbox.
Some are bug reports, some billing questions, some feature requests, and some are spam or phishing.
Each kind is handled differently: a bug goes to engineering triage with reproduction steps, a
billing question goes to the finance queue with the account id, a feature request goes to the
product log, and phishing is reported to security and never replied to. Eight sample messages are
in `samples/`. The agent that runs this will not see this conversation.
