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
        fetch("https://api.securelog.com/send-slack-message", {
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
      <div className="text-gray-400 mb-6 border border-dashed border-gray-500/25 rounded-lg p-3 break-words break-all">
        This is a test anthropic secret
        <span className="text-[#F5BE58] ml-2">
        sk-ant-api03-ha5kz3GnNTiS9ScbDD0Xuf1BAleGb8Xj8wMZnTZYaioVPtxPV6wcBPYtCKYor2z8JE1gQ6sUXBj0enoln2wjuQ-lI7F-wAA{" "}
        </span>
      </div>
      <ol
				className="list-inside list-decimal text-sm text-left text-gray-400 my-5 space-y-3"
			>
				<li>Secret masking is enabled for this secret hence why you can't see the
        secret value.</li>
				<li>
        This test app sends any secret found to an API that sends the
        secret to our public slack <span className="text-white"> securelog-rsc-notifications channel</span>. This is just an example of a good
        usecase for this component message.
        </li>
        <li>Join us on <a href="#https://join.slack.com/t/onboardbase-community/shared_invite/zt-1hqckrw8l-~RjaGExoczIk7e0X_4ZiWw" className="text-[#F5BE58]" target="_blank">slack</a>.</li>
			</ol>
    </SecureLog>
  );
};

const App = () => (
  <div className="relative flex flex-col p-8 sm:p-20">
    <h1 className="text-3xl font-semibold mb-6">Securelog RSC Test</h1>
    <HomeComponent />
    <div className="text-gray-400 mt-10">
      <a
        className="flex items-center gap-2 hover:underline text-sm"
        href="https://securelog.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4"
        >
          <path
            d="M16.555 5.412a8.028 8.028 0 0 0-3.503-2.81 14.899 14.899 0 0 1 1.663 4.472 8.547 8.547 0 0 0 1.84-1.662ZM13.326 7.825a13.43 13.43 0 0 0-2.413-5.773 8.087 8.087 0 0 0-1.826 0 13.43 13.43 0 0 0-2.413 5.773A8.473 8.473 0 0 0 10 8.5c1.18 0 2.304-.24 3.326-.675ZM6.514 9.376A9.98 9.98 0 0 0 10 10c1.226 0 2.4-.22 3.486-.624a13.54 13.54 0 0 1-.351 3.759A13.54 13.54 0 0 1 10 13.5c-1.079 0-2.128-.127-3.134-.366a13.538 13.538 0 0 1-.352-3.758ZM5.285 7.074a14.9 14.9 0 0 1 1.663-4.471 8.028 8.028 0 0 0-3.503 2.81c.529.638 1.149 1.199 1.84 1.66ZM17.334 6.798a7.973 7.973 0 0 1 .614 4.115 13.47 13.47 0 0 1-3.178 1.72 15.093 15.093 0 0 0 .174-3.939 10.043 10.043 0 0 0 2.39-1.896ZM2.666 6.798a10.042 10.042 0 0 0 2.39 1.896 15.196 15.196 0 0 0 .174 3.94 13.472 13.472 0 0 1-3.178-1.72 7.973 7.973 0 0 1 .615-4.115ZM10 15c.898 0 1.778-.079 2.633-.23a13.473 13.473 0 0 1-1.72 3.178 8.099 8.099 0 0 1-1.826 0 13.47 13.47 0 0 1-1.72-3.178c.855.151 1.735.23 2.633.23ZM14.357 14.357a14.912 14.912 0 0 1-1.305 3.04 8.027 8.027 0 0 0 4.345-4.345c-.953.542-1.971.981-3.04 1.305ZM6.948 17.397a8.027 8.027 0 0 1-4.345-4.345c.953.542 1.971.981 3.04 1.305a14.912 14.912 0 0 0 1.305 3.04Z"
          />
        </svg>
        Go to securelog.com →
      </a>
    </div>
	</div>
);

export default App;
