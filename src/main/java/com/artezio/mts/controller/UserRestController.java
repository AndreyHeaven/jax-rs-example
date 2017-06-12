package com.artezio.mts.controller;

import com.artezio.mts.dao.UserDAO;
import com.artezio.mts.dao.UserExistsException;
import com.artezio.mts.model.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.Collections;

/**
 * Контроллер управления учетными записями.
 * <p>
 * Created by araigorodskiy on 08.06.2017.
 */
@Api(value = "/users", description = "Operations with users")
@Produces({"application/json"})
@Path("/users")
public class UserRestController {
    UserDAO userDAO = UserDAO.getInstance();


    /**
     * Получение учетной записи по login
     *
     * @param login
     * @return
     */
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

    /**
     * Получение всех записей
     *
     * @return
     */
    @GET
    @ApiOperation("Get all users")
    @Path("/")
    public Response getAll() {

        Collection<User> user = userDAO.getAll();
        return Response.ok(user != null ? user : Collections.emptyList()).build();
    }

    /**
     * Удаление записи по login
     *
     * @param login
     * @return
     */
    @DELETE
    @ApiOperation("Delete user by login")
    @Path("{login}")
    public Response deleteById(@PathParam("login") String login) {
        userDAO.delete(login);
        return Response.ok().build();
    }

    /**
     * Создание новой записи
     *
     * @param user
     * @return
     */
    @POST
    @ApiOperation("Create new user")
    @Path("{login}")
    public Response create(@BeanParam User user) {
        try {
            userDAO.add(user);
            return Response.ok(user).build();
        } catch (UserExistsException e) {
            return Response.status(409).build();
        } catch (Exception e) {
            return Response.status(500).build();
        }
    }

    /**
     * Обновление записи
     *
     * @param user
     * @return
     */
    @PUT
    @ApiOperation("Update user with given login")
    @Path("{login}")
    public Response update(@BeanParam User user) {
        try {
            userDAO.update(user);
            return Response.ok(user).build();
        } catch (UserExistsException e) {
            return Response.status(409).build();
        } catch (Exception e) {
            return Response.status(500).build();
        }
    }

}
