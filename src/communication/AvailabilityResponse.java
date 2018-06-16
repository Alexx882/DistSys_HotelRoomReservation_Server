package communication;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement
public class AvailabilityResponse extends AvailabilityRequest {

    public AvailabilityResponse(AvailabilityRequest request) {
        this.typeId = request.typeId;
        this.startDate = request.startDate;
        this.endDate = request.endDate;
    }

    // either available and some num.
    // or not available and some alts.

    @XmlElement
    public boolean isRoomAvailable;

    @XmlElement
    public int numAvailableRooms;

    @XmlElement
    public List<Integer> alternativeRooms = new ArrayList<>();
}