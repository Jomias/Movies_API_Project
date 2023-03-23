import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import Button from "./Button";
import customConfirm from "./customConfirm";
import GenericList from "./GenericList";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordsPerPageSelect";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const [entities, setEntities] = useState<T[]>();
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const buttons = (editUrl: string, id: number) => (
    <>
      <Link className="btn btn-success" to={editUrl}>
        Edit
      </Link>
      <Button
        className="btn btn-danger"
        onClick={() => customConfirm(() => deleteEntity(id))}
      >
        Delete
      </Button>
    </>
  );
  function loadData() {
    axios
      .get(props.url, { params: { page, recordsPerPage } })
      .then((response: AxiosResponse<T[]>) => {
        const totalAmountOfRecords = parseInt(
          response.headers["totalamountofrecords"],
          10
        );
        setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
        setEntities(response.data);
      });
  }
  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, recordsPerPage]);

  async function deleteEntity(id: number) {
    try {
      await axios.delete(`${props.url}/${id}`);
      loadData();
    } catch (error: any) {
      if (error && error.response) {
        console.error(error.response.data);
      }
    }
  }
  return (
    <>
      <h3>{props.title}</h3>
      <Link className="btn btn-primary" to={props.createURL}>
        Create {props.entityName}
      </Link>

      <RecordsPerPageSelect
        onChange={(amountOfRecords) => {
          setPage(1);
          setRecordsPerPage(amountOfRecords);
        }}
      />
      <GenericList list={entities}>
        <table className="table table-striped table-responsive mt-3">
            {props.children(entities!, buttons)}
        </table>
      </GenericList>
      
      <Pagination
        currentPage={page}
        totalAmountOfPages={totalAmountOfPages}
        onChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}

interface indexEntityProps<T> {
    url: string;
    title: string;
    createURL: string;
    entityName: string;
    children(entities: T[],
        buttons: (editURL: string, id: number) => ReactElement): ReactElement;
}
