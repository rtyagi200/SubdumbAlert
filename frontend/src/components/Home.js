import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import $ from 'jquery';
import { signOut, isAuth } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import { saveAs } from 'file-saver';

axios.defaults.withCredentials = true;

const Home = () => {
    let history = useHistory();

    const [formData, setFormData] = useState({
        domain: '',
    })

    const [domainList, setDomainList] = useState([]);
    const [subdomainList, setSubdomainList] = useState([]);
    const [editDomainId, setEditDomainId] = useState();
    const [editUserId, setEditUserId] = useState();

    const { domain } = formData;

    //Handle Change from inputs
    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    }

    //Submit register data to backend
    const handleDomainSubmit = e => {
        e.preventDefault();
        if (domain) {
            axios.post('http://localhost:5000/api/domains/add-new-domain', {
                domain
            }).then(res => {
                if (res.data.success) {
                    setFormData({
                        ...formData,
                        domain: ''
                    })
                    let updatedData = [...domainList, res.data.result];
                    setDomainList(updatedData);
                    toast.success(res.data.message);
                    document.getElementById('closeAddModal').click();
                } else {
                    toast.error(res.data.message);
                }
            }).catch(err => {
                toast.error("Something went wrong, please try again later");
            })
        } else {
            toast.error('Please fill all the fields');
        }
    }

    const handleEditDomainSubmit = e => {
        e.preventDefault();
        if (domain && editDomainId && editUserId) {
            axios.patch('http://localhost:5000/api/domains/edit-domain', {
                editDomainId, domain, editUserId
            }).then(res => {
                if (res.data.success) {
                    let updatedData = domainList.map(domainItem => {
                        if (domainItem._id == editDomainId) {
                            domainItem.domainName = domain;
                        }
                        return domainItem;
                    })
                    setDomainList(updatedData);
                    setFormData({
                        ...formData,
                        domain: ''
                    })
                    toast.success(res.data.message);
                    document.getElementById('closeEditModal').click();
                } else {
                    toast.error(res.data.message);
                }
            }).catch(err => {
                toast.error("Something went wrong, please try again later");
            })
        } else {
            toast.error('Please fill all the fields');
        }
    }

    let getAllSubdomains = async (e) =>{
        let searchKey = (e && e.target) ? e.target.value : '';
        axios.get(`http://localhost:5000/api/subdomains/getSudomains?q=${searchKey}`).then(res => {
            if (res.data.success) {
                setSubdomainList(res.data.subdomains);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => {
            toast.error("Something went wrong, please try again later");
            logout();
        })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/api/domains/').then(res => {
            if (res.data.success) {
                setDomainList(res.data.domains);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => {
            toast.error("Something went wrong, please try again later");
            logout();
        })

        getAllSubdomains();

    }, []);

    const display = domainList.map(domain =>
        <tr key={domain._id}>
            <td>{domain.domainName}</td>
            <td>{domain.username}</td>
            <td><span className="float-right mr-3"><button type="button" className="btn btn-primary btn-xs" onClick={() => getEditDomain(domain._id, domain.userId)} ><i className="fa fa-edit"></i></button>
                <button className="btn btn-danger btn-xs ml-3" onClick={() => removeDomain(domain._id, domain.userId)}><i className="fa fa-trash"></i></button></span></td>
        </tr>
    )

    const displaySubdomains = subdomainList.map(domain =>
        <tr key={domain._id}>
            <td>{domain.domainName}</td>
            <td>{JSON.parse(domain.subdomains).length ? <button className="btn btn-danger btn-xs ml-3" title="Dowload PDF" onClick={() => downloadSubdomains(domain.domainName, JSON.parse(domain.subdomains))}><i className="fas fa-file-download"></i></button> : <><i className="fas fa-exclamation-circle ml-3"></i> No Item Available</>}</td>
            <td>{JSON.parse(domain.newSubdomains).length ? <button className="btn btn-danger btn-xs ml-3" title="Dowload PDF" onClick={() => downloadSubdomains(domain.domainName, JSON.parse(domain.newSubdomains))}><i className="fas fa-file-download font-weight-bold"></i></button> : <><i className="fas fa-exclamation-circle ml-5"></i>No Item Available</>}</td>
            <td><button type="button" className="btn btn-primary btn-sm font-weight-bolder">{JSON.parse(domain.subdomains).length}{JSON.parse(domain.newSubdomains).length ? <>&nbsp;<span className="badge badge-light" data-toggle="tooltip" title="Newly Added">{JSON.parse(domain.newSubdomains).length}</span></> : null}</button></td>
        </tr>
    )

    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip({
            placement : 'right'
        });
    });


    function downloadSubdomains(domain, subdomains) {
        toast.success("PDF is downloading...");
        axios.post('http://localhost:5000/api/subdomains/create-pdf', {
            domain, subdomains
        }).then(() => {
            axios.get('http://localhost:5000/api/subdomains/fetch-pdf', {
                responseType: 'blob'
            }).then((res) => {
                let pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'subdomains.pdf');
            }).catch(err => {
                toast.error("Something went wrong, please try again later");
            })
        }).catch(err => {
            toast.error("Something went wrong, please try again later");
        })
    }


    function removeDomain(domainId, userId) {
        axios.delete('http://localhost:5000/api/domains/delete-domain', {
            data: {
                domainId,
                userId
            }
        }).then(res => {
            if (res.data.success) {
                let updatedData = domainList.filter(domain => domain._id !== domainId);
                setDomainList(updatedData);
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => {
            toast.error(JSON.stringify(err));
        })
    }

    function getEditDomain(domainId, userId) {
        setEditDomainId('');
        setEditUserId('');
        axios.post('http://localhost:5000/api/domains/get-edit-domain', {
            domainId,
            userId
        }
        ).then(res => {
            if (res.data.success) {
                setFormData({
                    ...formData,
                    domain: res.data.domain.domain
                })
                $('#editModalCenter').modal('show');
                setEditDomainId(domainId);
                setEditUserId(userId);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => {
            toast.error(JSON.stringify(err));
        })
    }

    function logout() {
        signOut();
        history.push('/');
    }

    function openCreateModel(e) {
        e.preventDefault();
        setFormData({
            ...formData,
            domain: ''
        })
        $('#createModalCenter').modal('show');
    }

    return (
        <>
            {isAuth() ? null : <Redirect to='/' />}
            <Helmet>
                <link rel="stylesheet" href='/css/homestyle.css' />
            </Helmet>
            <ToastContainer />
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="scrollspy">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">SubDumAlert</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item mx-5">
                                    <a className="nav-link" href="#">New Domains</a>
                                </li>
                                <li className="nav-item mx-5">
                                    <a className="nav-link" href="#subdomains">Subdomains List</a>
                                </li>
                            </ul>
                            {isAuth() ? <NavLink id="login" className="btn rounded-pill" type="submit" to="/" onClick={logout}>Logout</NavLink> : <NavLink id="login" className="btn rounded-pill " type="submit" to="/join">Join</NavLink>}
                        </div>
                    </div>
                </nav>
            </header>
            <div className="mid container">
                <section id="domains">
                    <div className="section-content">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item" aria-current="page">Newly Added Domains</li>
                                <li className="ml-auto"><span className="bg-dark rounded-pill py-1 px-2 addButton" onClick={openCreateModel}>Add <i className="fa fa-plus"></i></span></li>
                            </ol>
                        </nav>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Domain Name</th>
                                    <th scope="col">Added by</th>
                                    <th scope="col"><span className="float-right mr-5">Action</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {display.length ? display :
                                    <tr>
                                        <td colSpan="3"><i className="fas fa-exclamation-circle"></i> We don't have any new domains.</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                        <div className="modal fade" id="createModalCenter" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="createModalCenterTitle">Add New Domain</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form method="POST">
                                            <div className="form-group">
                                                <label htmlFor="recipient-name" className="col-form-label">Domain Name:</label>
                                                <input type="text" className="form-control" id="recipient-name" onChange={handleChange('domain')} value={domain} required />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button id="closeAddModal" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={handleDomainSubmit}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="editModalCenter" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="editModalCenterTitle">Edit Domain</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form method="POST">
                                            <div className="form-group">
                                                <label htmlFor="recipient-name" className="col-form-label">Domain Name:</label>
                                                <input type="text" className="form-control" onChange={handleChange('domain')} value={domain} required />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button id="closeEditModal" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={handleEditDomainSubmit}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="subdomains">
                    <div className="section-content">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item align-middle" aria-current="page">Subdomains</li>
                                <li className="ml-auto">
                                    <form className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={getAllSubdomains}/>
                                        <button className="btn bg-dark rounded-circle font-weight-bold text-white my-2 my-sm-0" type="submit"><i className="fas fa-search"></i></button>
                                    </form>
                                </li>
                            </ol>
                        </nav>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Domain Name</th>
                                    <th scope="col">Subdomains</th>
                                    <th scope="col">New Subdomains</th>
                                    <th scope="col">Count</th>
                                </tr>
                            </thead>
                            <tbody>
                            {displaySubdomains.length ? displaySubdomains :
                                    <tr>
                                        <td colSpan="4"><i className="fas fa-exclamation-circle"></i> We don't have any domains.</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home;