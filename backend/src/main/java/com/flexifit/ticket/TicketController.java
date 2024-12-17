package com.flexifit.ticket;

import com.flexifit.userticket.UserTicket;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
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
    public ResponseEntity<?> getTicketById(@PathVariable Long id) {
        try {
            return ticketService.findById(id)
                    .map(ResponseEntity::ok)
                    .orElseThrow(() -> new IllegalArgumentException("Ticket not found with ID: " + id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createTicket(@Valid @RequestBody Ticket ticket, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        try {
            Ticket createdTicket = ticketService.createServiceTicket(ticket);
            return ResponseEntity.ok(createdTicket);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTicket(
            @PathVariable Long id,
            @Valid @RequestBody Ticket ticketDetails,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        try {
            return ticketService.updateServiceTicket(id, ticketDetails)
                    .map(ResponseEntity::ok)
                    .orElseThrow(() -> new IllegalArgumentException("Ticket not found with ID: " + id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id) {
        try {
            if (ticketService.deleteServiceTicket(id)) {
                return ResponseEntity.ok("Deleted ticket with ID: " + id);
            }
            throw new IllegalArgumentException("Ticket not found with ID: " + id);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/{ticketId}/purchased-by/{userId}")
    public ResponseEntity<?> buyTicket(@PathVariable Long ticketId, @PathVariable Long userId) {
        try {
            UserTicket purchasedTicket = ticketService.buyServiceTicket(ticketId, userId);
            PurchasedTicketResponse response = PurchasedTicketResponse.builder()
                    .id(purchasedTicket.getTicket().getId())
                    .name(purchasedTicket.getTicket().getName())
                    .description(purchasedTicket.getTicket().getDescription())
                    .price(purchasedTicket.getTicket().getPrice())
                    .purchaseDate(purchasedTicket.getPurchaseDate())
                    .expirationDate(purchasedTicket.getExpirationDate())
                    .build();
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) {
        try {
            String imageUrl = ticketService.saveImage(file);
            return ResponseEntity.ok(new HashMap<String, String>() {{
                put("imageUrl", imageUrl);
            }});
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Błąd podczas wgrywania zdjęcia: " + e.getMessage());
        }
    }
}
