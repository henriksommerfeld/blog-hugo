---
title: "Error Handling with Fetch (and custom React hook)"
date: 2019-03-19T21:35:58+01:00
url: "error-handling-with-fetch"
categories: ["Coding"]
tags: [JavaScript, React]
summary: "One thing that has struck me javascript's fetch function is that it often looks so simple. When I see the same thing in a pull request, I'm not overly impressed. No, just because this works on a sunny day doesn't mean you're done. You need error handling as well!"
draft: false
---

<figure class="image-border" style="margin-top: 2em">
  <img src="../images/david-kovalenko-414249-unsplash_1500.jpg" alt="airplane on ground surrounded with trees">
    <figcaption>
      <p>Photo by <a href="https://unsplash.com/photos/G85VuTpw6jg">David Kovalenko</a> on <a href="https://unsplash.com/">Unsplash</a>. Importance of error handling - how did we end up here?</p>
    </figcaption>    
</figure>

One thing that has struck me javascript's `fetch` function is that it often looks so simple. 

{{<highlight javascript>}}
fetch('/something.json')
  .then(res => res.json())
  .then(json => {
    // do something useful here with json...
  });
{{</highlight>}}

When I see the same thing in a pull request, I'm not overly impressed. No, just because this works on a sunny day doesn't mean you're done. You need error handling as well! Being explicit about how to handle errors is so much better than giving users an infinite spinner to stare at.

Since `fetch` doesn't throw you into the `catch` clause for non-2xx responses, you need to check the `ok` property or check `status` for a specific status code. But both `then` and `catch` can use the same function for error handling.

{{<highlight javascript>}}
let isLoading = true;
let hasError = false;
let data = {};

function handleFetchResponse(response) {
  hasError = !response.ok;
  isLoading = false;
  return response.ok && response.json ? response.json() : data;
}

function fetchData() {
  return fetch(url)
    .then(handleFetchResponse)
    .catch(handleFetchResponse);
}

fetchData().then(data => {
  // do something useful here with data...
});
{{</highlight>}}

Of course it all depends on your application, but to me this is minimal error handling. To have it be used by the team throughout an application, I've found it necessary to encapsulate it into a reusable function. I'm currently working in a React code base, so this is the custom hook I wrote.

{{<highlight javascript>}}
import { useEffect, useState } from "react";

/*  Example
    initialUrl: "/_api/jobs"
    initialData: [] //usually empty array or object
*/
export const useOurApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [fetchedData, setFetchedData] = useState(initialData);

  useEffect(() => {
    let unmounted = false;

    const handleFetchResponse = response => {
      if (didCancel) return initialData;

      setHasError(!response.ok);
      setIsLoading(false);
      return response.ok && response.json ? response.json() : initialData;
    };

    const fetchData = () => {
      setIsLoading(true);
      return fetch(url, { credentials: 'include' })
        .then(handleFetchResponse)
        .catch(handleFetchResponse);
    };

    if (initialUrl)
      fetchData().then(data => !unmounted && setFetchedData(data));

    return () => {
      unmounted = true;
    };
  }, [url]);

  return { isLoading, hasError, setUrl, data: fetchedData };
};
{{</highlight>}}

This way, you get an error indicator and a loading indicator out-of-the-box when using this data fetching function. Used like this in a (simplified) _Jobs.jsx_.

{{<highlight jsx>}}
import React from "react";
import { useOurApi } from "../Common/Services/HttpService";
import { Spinner } from "../Common/Components/Spinner";
import { ErrorMessage } from "../Common/Components/ErrorMessage";
import { JobFeed } from "./JobFeed";

export default function Jobs() {
  const url = `/_api/jobs`;
  const { data, isLoading, hasError } = useOurApi(url, {});

  if (isLoading) return <Spinner />;

  if (hasError)
    return <ErrorMessage message={`Failed to fetch open jobs 😟`} />;

  return (
    <div className="our-grid">
      <JobFeed jobs={data} />
    </div>
  );
}
{{</highlight>}}