import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jobsContext } from "../../Job_Search/JobSearchProvider";
import ReactPaginate from "react-paginate";
import "./ListOfJobs.css";

function ListOfJobs() {
  const { jobList, setfireRedirect } = useContext(jobsContext);

  // Variables used for ReactPaginate
  const [pageNumber, setPageNumber] = useState(0);
  const jobsPerPage = 4;
  const viewedPages = pageNumber * jobsPerPage;

  useEffect(() => {
    setfireRedirect(false);
  });

  return (
    <div>
      <div className="jobList">
        {/* ----------------------------------------------------------------------------------- */}
        {/*       If no requiested jobs in database */}
        {/* ----------------------------------------------------------------------------------- */}
        {jobList.NojobsFound ? (
          <p>
            This is so embarrassing! No Jobs found regarding{" "}
            <span>{jobList.jobName} </span>
            in <span> {jobList.city}</span>! Please try react relatated jobs in
            Milan!
          </p>
        ) : (
          jobList
            .slice(viewedPages, viewedPages + jobsPerPage)
            .map((job) => {
              return (
                // -----------------------------------------------------------------------------------
                //      If found requiested jobs in database display list of jobs
                // -----------------------------------------------------------------------------------
                <div key={job.jobId} className="singleJob">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`job/${job.jobId}`}
                  >
                    <h3>{job.jobName}</h3>
                    <p>{job.companyName}</p>
                    <p>{job.city}</p>
                  </Link>
                </div>
              );
            })
            .reverse()
        )}
        {/* ----------------------------------------------------------------------------------- */}
        {/* --------------------------- React pagination ---------------------------------------*/}
        {/*       If no requiested jobs in database hide pagination                             */}
        {/* ----------------------------------------------------------------------------------- */}
        <div
          className={`${
            !jobList.NojobsFound ? "pagination-container" : "pagination-none"
          }`}
        >
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            pageCount={Math.ceil(jobList.length / jobsPerPage)}
            onPageChange={({ selected }) => {
              setPageNumber(selected);
            }}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </div>
  );
}

export default ListOfJobs;
