import Map from "@components/map";
import "../../node_modules/antd/dist/antd";
import SearchComponent from "@components/searchComponent";
import Nav from "@components/navBar";
const Home = () => {
  return (
    <>
      <Nav />
      <SearchComponent />
      <Map />
    </>
  );
};

export default Home;
