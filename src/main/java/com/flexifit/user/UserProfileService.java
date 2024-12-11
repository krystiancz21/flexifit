package com.flexifit.user;

import com.flexifit.groupclass.GroupClass;
import com.flexifit.groupclass.GroupClassRepository;
import com.flexifit.ticket.Ticket;
import com.flexifit.usergroupclass.UserGroupClass;
import com.flexifit.usergroupclass.UserGroupClassRepository;
import com.flexifit.userticket.UserTicket;
import com.flexifit.userticket.UserTicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;
    private final UserGroupClassRepository userGroupClassRepository;
    private final UserTicketRepository userTicketRepository;
    private final GroupClassRepository groupClassRepository;

    public Map<String, Object> getUserReservations(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<GroupClass> groupClasses = userGroupClassRepository.findByUser(user)
                .stream()
                .map(userGroupClass -> userGroupClass.getGroupClass())
                .toList();

        List<Ticket> tickets = userTicketRepository.findByUser(user)
                .stream()
                .map(userTicket -> userTicket.getTicket())
                .toList();

        Map<String, Object> reservations = new HashMap<>();
        reservations.put("groupClasses", groupClasses);
        reservations.put("tickets", tickets);

        return reservations;
    }

    @Transactional
    public void cancelGroupClass(String userEmail, Long classId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        GroupClass groupClass = groupClassRepository.findById(classId)
                .orElseThrow(() -> new IllegalArgumentException("Class not found"));

        UserGroupClass userGroupClass = userGroupClassRepository.findByUserAndGroupClass(user, groupClass)
                .orElseThrow(() -> new IllegalArgumentException("No reservation found for this class"));

        userGroupClassRepository.delete(userGroupClass);
        
        // Zwiększamy dostępną pojemność zajęć o 1
        groupClass.setCapacity(groupClass.getCapacity() + 1);
        groupClassRepository.save(groupClass);
    }

    @Transactional
    public void cancelTicket(String userEmail, Long ticketId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        UserTicket userTicket = userTicketRepository.findByUserAndTicketId(user, ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found"));

        userTicketRepository.delete(userTicket);
    }
}