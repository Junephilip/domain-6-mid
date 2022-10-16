import { useEffect, useState } from "react";
function App() {
  const [venues, setVenues] = useState(null);
  const [schedules, setSchedules] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetch("https://sis.materdeicollege.com/api/venues")
      .then((response) => {
        return response.json();
      })
      .then((data) => setVenues(data.venues))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    fetch("https://sis.materdeicollege.com/api/venues/" + id)
      .then((response) => {
        return response.json();
      })
      .then((data) => setSchedules(data.schedules))
      .catch((error) => console.log(error.message));
  }, [id]);

  console.log(schedules);

  const showScedule = (id) => {
    setId(id);
  };

  return (
    <div>
      <div
        className="modal fade modal-lg"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
            </div>
            <div className="modal-body modal-dialog-centered modal-dialog-scrollable">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Course No</th>
                    <th scope="col">Description</th>
                    <th scope="col">Schedule</th>
                    <th scope="col">Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules?.map((sched, index) => (
                    <tr key={index}>
                      <td>{sched.course_no}</td>
                      <td>{sched.description}</td>
                      <td>{sched.schedule}</td>
                      <td>{sched.teacher}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center text-white bg-primary">
        Mater Dei College Venues
      </h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Building</th>
            <th scope="col">Capacity</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {venues?.map((venue, index) => (
            <tr key={index} onClick={() => showScedule(venue.id)}>
              <td>{venue.id}</td>
              <td>{venue.building}</td>
              <td>{venue.capacity}</td>
              <td>{venue.name}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => {
                    setId(venue.id);
                  }}
                >
                  Show Schedules
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
