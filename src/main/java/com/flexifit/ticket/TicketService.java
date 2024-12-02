package com.flexifit.ticket;

import com.flexifit.user.User;
import com.flexifit.user.UserRepository;
import com.flexifit.userticket.UserTicket;
import com.flexifit.userticket.UserTicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final UserTicketRepository userTicketRepository;

    public TicketService(TicketRepository ticketRepository, UserRepository userRepository, UserTicketRepository userTicketRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.userTicketRepository = userTicketRepository;
    }

    public Ticket createServiceTicket(Ticket serviceTicket) {
        return ticketRepository.save(serviceTicket);
    }

    public List<Ticket> getAllServiceTickets() {
        return ticketRepository.findAll();
    }

    public Optional<Ticket> findById(Long id) {
        return ticketRepository.findById(id);
    }

    public Optional<Ticket> updateServiceTicket(Long id, Ticket ticketDetails) {
        return ticketRepository.findById(id).map(ticket -> {
            ticket.setName(ticketDetails.getName());
            ticket.setDescription(ticketDetails.getDescription());
            ticket.setValidityPeriod(ticketDetails.getValidityPeriod());
            ticket.setPrice(ticketDetails.getPrice());
            ticket.setImageUrl(ticketDetails.getImageUrl());
            ticket.setAllowedEntries(ticketDetails.getAllowedEntries());
            ticket.setStatus(ticketDetails.getStatus());
            return ticketRepository.save(ticket);
        });
    }

    public boolean deleteServiceTicket(Long id) {
        if (ticketRepository.existsById(id)) {
            ticketRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Ticket buyServiceTicket(Long ticketId, Long userId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        UserTicket userTicket = UserTicket.builder()
                .user(user)
                .ticket(ticket)
                .build();

        userTicketRepository.save(userTicket);

        return ticket;
    }
}