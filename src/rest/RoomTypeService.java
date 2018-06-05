package rest;

import communication.AdminRequest;
import communication.BookingRequest;
import controllers.HotelRoomManager;
import controllers.HotelSecurityManager;
import database.DatabaseRepository;
import database.DummyRepos;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/roomtypes")
public class RoomTypeService {
    private DatabaseRepository repos;
    private HotelSecurityManager securityManager;
    private HotelRoomManager roomManager;

    public RoomTypeService() {
        repos = new DummyRepos();
        securityManager = new HotelSecurityManager();
        roomManager = new HotelRoomManager();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        return Response.ok(repos.getRoomTypes(), MediaType.APPLICATION_JSON).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSingle(@PathParam("id") int id) {
        return Response.ok(repos.getRoomType(id), MediaType.APPLICATION_JSON).build();
    }

    @POST
    public Response setAvailabilty(AdminRequest request) {
        if (request == null)
            return Response.status(Response.Status.BAD_REQUEST).build();

        // check credentials
        if (!securityManager.validCredentials(request.password))
            return Response.status(Response.Status.FORBIDDEN).build();

        // update the information as desired
        roomManager.updateRoomProperties(request.typeId, request.numberOfRooms, request.prize);

        // return 204
        return Response.noContent().build();
    }

    @POST
    @Path("/booking")
    public Response bookRoom(BookingRequest request) {
        if (request == null)
            return Response.status(Response.Status.BAD_REQUEST).build();

        roomManager.bookRoom(request);

        return Response.noContent().build();
    }
}