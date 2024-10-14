import React, { useEffect, useState } from "react";
import { SecureLog } from "securelog-rsc";

export const HomeComponent = (props: any) => {
  const [secrets, setSecrets] = useState([]);

  const handleSecretsFound = (record: any) => {
    setSecrets(record);
  };

  useEffect(() => {
    const sendSlackNotification = async (foundSecrets: Record<string, any>) => {
      const payload = {
        text: `*Secrets have been found:*\n\n${foundSecrets
          .map(
            (secret: Record<string, any>) =>
              `Detector: ${secret.detector}\nValue:${secret.rawValue}\n`
          )
          .join("\n")}`,
      };

      try {
        fetch("http://localhost:3000/send-slack-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Message sent successfully:", data);
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
      } catch (error) {
        console.error("Error sending Slack notification:", error);
      }
    };

    if (secrets.length) {
      sendSlackNotification(secrets);
    }
  }, [secrets]);
  return (
    <SecureLog
      mask={true}
      onSecretFound={(result: any) => {
        handleSecretsFound(result);
      }}
    >
      this is a test anthropic secret
      sk-ant-api03-ha5kz3GnNTiS9ScbDD0Xuf1BAleGb8Xj8wMZnTZYaioVPtxPV6wcBPYtCKYor2z8JE1gQ6sUXBj0enoln2wjuQ-lI7F-wAA{" "}
      Secret Masking is enabled for this secret hence why you can't see the
      secret value
      <p>
        This app sends any secret found to an API that in return sends the
        secret to our public slack channel. This is just an example of a good
        usecase for this component message
      </p>
    </SecureLog>
  );
};

const App = () => (
  <div>
    <h1>SecureLog React Component</h1>
    <HomeComponent />
  </div>
);

export default App;
