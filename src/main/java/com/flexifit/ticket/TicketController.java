package com.flexifit.ticket;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tickets")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        List<Ticket> tickets = ticketService.getAllServiceTickets();
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        return ticketService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createTicket(@Valid @RequestBody Ticket ticket, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        Ticket createdTicket = ticketService.createServiceTicket(ticket);
        return ResponseEntity.ok(createdTicket);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Object> updateTicket(@PathVariable Long id, @Valid @RequestBody Ticket ticketDetails, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        return ticketService.updateServiceTicket(id, ticketDetails)
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Element o ID: " + id + " nie istnieje"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id) {
        if (ticketService.deleteServiceTicket(id)) {
            return ResponseEntity.ok("Usunięto element o ID: " + id);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Element o ID: " + id + " nie istnieje");
    }

    @PostMapping("/{ticketId}/purchased-by/{userId}")
    public ResponseEntity<TicketResponse> buyTicket(@PathVariable Long ticketId, @PathVariable Long userId) {
        Ticket ticket = ticketService.buyServiceTicket(ticketId, userId);
        TicketResponse ticketResponse = TicketResponse.builder()
                .id(ticket.getId())
                .name(ticket.getName())
                .description(ticket.getDescription())
                .price(ticket.getPrice())
                .build();
        return ResponseEntity.ok(ticketResponse);
    }
}
