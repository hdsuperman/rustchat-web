// import React from 'react'
import { Helmet } from "react-helmet";

import BASE_URL from "../../app/config";
import { useGetServerQuery } from "../../app/services/server";

export default function Meta() {
  const { data, isSuccess } = useGetServerQuery();

  return (
    <>
      <Helmet>
        <link rel="icon" href={`${BASE_URL}/resource/organization/logo`} />
        {isSuccess && <title>{data.name} Web App</title>}
      </Helmet>
    </>
  );
}
