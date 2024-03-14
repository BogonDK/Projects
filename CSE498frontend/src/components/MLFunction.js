const React = require('react');

export const fetchMlResult = (inputData) => {
  fetch('https://jr4axp2bah.execute-api.us-east-2.amazonaws.com/prod', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      a: inputData[0],
      b: inputData[1],
      c: inputData[2],
      d: inputData[3]
    })
  })
    .then(response => response.json())
    .then(prediction => console.log(prediction))
    .catch(error => console.error(error));
}

function MLFunction() {
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const a = formData.get('a');
    const b = formData.get('b');
    const c = formData.get('c');
    const d = formData.get('d');

    fetch('https://jr4axp2bah.execute-api.us-east-2.amazonaws.com/prod', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        a: a,
        b: b,
        c: c,
        d: d
      })
    })
      .then(response => response.json())
      .then(prediction => setPrediction(prediction))
      .catch(error => console.error(error));
  };

  // Call handleSubmit function with hardcoded values
  handleSubmit({
    preventDefault: () => {},
    target: {
      elements: {
        a: { value: 11 },
        b: { value: 0 },
        c: { value: 3 },
        d: { value: 1 },
      },
    },
  });

  console.log(prediction);

  return (
    <div>
      <h1>Make a prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          a:
          <input type="number" name="a" />
        </label>
        <label>
          b:
          <input type="number" name="b" />
        </label>
        <label>
          c:
          <input type="number" name="c" />
        </label>
        <label>
          d:
          <input type="number" name="d" />
        </label>
        <button type="submit">Submit</button>
      </form>
      {prediction && (
        <p>The prediction is: {prediction.prediction.join(', ')}</p>
      )}
    </div>
  );
}

export default MLFunction;
