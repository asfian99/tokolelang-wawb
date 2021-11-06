import axios from "axios";
import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  React.useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:8080/users?username=asfian"
      );

      console.log(res.data);
    };

    fetch();
  });
  return (
    <div className="mx-32 my-12">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
        voluptate neque facilis iste exercitationem ullam tempora labore
        voluptatibus quaerat eos provident expedita, corporis nisi, pariatur in
        quidem consequuntur dolorem id! Consequatur consectetur nesciunt quo
        voluptatibus. Quis accusamus odio consectetur deserunt minima dolor
        asperiores dicta, rerum tempore, facere magnam eaque neque.
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
        voluptate neque facilis iste exercitationem ullam tempora labore
        voluptatibus quaerat eos provident expedita, corporis nisi, pariatur in
        quidem consequuntur dolorem id! Consequatur consectetur nesciunt quo
        voluptatibus. Quis accusamus odio consectetur deserunt minima dolor
        asperiores dicta, rerum tempore, facere magnam eaque neque.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
        voluptate neque facilis iste exercitationem ullam tempora labore
        voluptatibus quaerat eos provident expedita, corporis nisi, pariatur in
        quidem consequuntur dolorem id! Consequatur consectetur nesciunt quo
        voluptatibus. Quis accusamus odio consectetur deserunt minima dolor
        asperiores dicta, rerum tempore, facere magnam eaque neque.
      </p>
    </div>
  );
};

export default Home;
