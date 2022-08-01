import HomePageCars from "./img/home-car.jpg";

function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Drive Swiftly</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership management for
          tracking inventory, repairs, and sales!
        </p>
        <div>
          <img src={HomePageCars} alt="parked cars" height="400" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
