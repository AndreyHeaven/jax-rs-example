package com.artezio.mts.controller;

import com.artezio.mts.dao.UserDAO;
import com.artezio.mts.model.User;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Collection;

/**
 * Created by araigorodskiy on 08.06.2017.
 */
@Path("users")
public class UserRestController {
    UserDAO userDAO = UserDAO.getInstance();

    @GET
    @Path("{login}")
    public Response getById(@PathParam("login") String login) {

        User user = userDAO.getById(login);
        if (user != null)
            return Response.ok(user).build();
        else
            return Response.status(404).build();

    }
    @GET
    public Response getAll() {

        Collection<User> user = userDAO.getAll();
        if (user != null && !user.isEmpty())
            return Response.ok(user).build();
        else
            return Response.status(404).build();

    }

    @DELETE
    @Path("{login}")
    public Response deleteById(@PathParam("login") String login){
        userDAO.delete(login);
        return Response.ok().build();
    }

    @POST
    public Response create(@BeanParam User user){
        try {
            userDAO.add(user);
            return Response.ok(user).build();
        } catch (Exception e) {
            return Response.status(409).build();
        }
    }

    @PUT
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
