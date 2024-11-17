import { useEffect, useState } from "react";

import { libraryService } from "services/libraryService";
import Library from "components/Library";

function Libraries() {
  const [libraries, setLibraries] = useState([]);

  useEffect(() => {
    (async function() {
      const items = await libraryService.getAllLibraries();
      setLibraries(items);
    })();
  }, []);

  return (
    <div>
      <h1>Libraries</h1>
      <div>
        {libraries.map(library => <Library key={library.id} library={library} />)}
      </div>
    </div>
  );
}

export default Libraries;
