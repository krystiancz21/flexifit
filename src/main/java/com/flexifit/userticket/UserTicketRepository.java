package com.flexifit.userticket;

import com.flexifit.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserTicketRepository extends JpaRepository<UserTicket, Long> {
    List<UserTicket> findByUser(User user);
    Optional<UserTicket> findByUserAndTicketId(User user, Long ticketId);
    List<UserTicket> findByUserIdAndTicketId(Long userId, Long ticketId);
}
