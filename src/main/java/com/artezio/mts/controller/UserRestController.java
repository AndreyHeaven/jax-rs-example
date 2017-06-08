package com.artezio.mts.controller;

import com.artezio.mts.dao.UserDAO;
import com.artezio.mts.model.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Collection;

/**
 * Created by araigorodskiy on 08.06.2017.
 */
@Api(value = "/users", description = "Operations with users")
@Produces({"application/json"})
@Path("/users")
public class UserRestController {
    UserDAO userDAO = UserDAO.getInstance();


    @GET
    @ApiOperation("Get user by login")
    @Path("{login}")
    public Response getById(@PathParam("login") String login) {

        User user = userDAO.getById(login);
        if (user != null)
            return Response.ok(user).build();
        else
            return Response.status(404).build();

    }
    @GET
    @ApiOperation("Get all users")
    @Path("/")
    public Response getAll() {

        Collection<User> user = userDAO.getAll();
        if (user != null && !user.isEmpty())
            return Response.ok(user).build();
        else
            return Response.status(404).build();

    }

    @DELETE
    @ApiOperation("Delete user by login")
    @Path("{login}")
    public Response deleteById(@PathParam("login") String login){
        userDAO.delete(login);
        return Response.ok().build();
    }

    @POST
    @ApiOperation("Create new user")
    public Response create(@BeanParam User user){
        try {
            userDAO.add(user);
            return Response.ok(user).build();
        } catch (Exception e) {
            return Response.status(409).build();
        }
    }

    @PUT
    @ApiOperation("Update user with given login")
    @Path("{login}")
    public Response update(@BeanParam User user){
        try {
            userDAO.update(user);
            return Response.ok(user).build();
        } catch (Exception e) {
            return Response.status(404).build();
        }
    }

}
