function Content() {
    return (
      <div className="content">
        <h5>Set your time : </h5>
        <div className="settings">
            <input type="number" id="minutes" placeholder="Minutes.." />
            <input type="number" id="seconds" placeholder="Secondes.." />
        </div>
        <div className="action">
            <button id="start">Start</button>
        </div>
      </div>
    );
  }

  export default Content;
