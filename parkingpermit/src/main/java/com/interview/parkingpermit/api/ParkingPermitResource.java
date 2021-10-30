package com.interview.parkingpermit.api;

import com.interview.parkingpermit.domain.ParkingPermit;
import com.interview.parkingpermit.repository.ParkingPermitRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/permit")
public class ParkingPermitResource {

    private final Logger log = LoggerFactory.getLogger(ParkingPermit.class);

    private final ParkingPermitRepository parkingPermitRepository;

    @Autowired
    public ParkingPermitResource(ParkingPermitRepository parkingPermitRepository) {
        this.parkingPermitRepository = parkingPermitRepository;
    }

    @GetMapping
    public ResponseEntity<List<ParkingPermit>> fetchAllParkingPermits() {
        log.debug("REST GET request to fetch all parking permits: /api/permit");
        List<ParkingPermit> permits = parkingPermitRepository.findAll();
        return ResponseEntity.ok(permits);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParkingPermit> fetchParkingPermit(@PathVariable("id") Long id) {
        log.debug("REST GET request to fetch parking permit with id " + id + ": /api/permit/{id}");
        Optional<ParkingPermit> permit = parkingPermitRepository.findById(id);
        return ResponseEntity.of(permit); // throws a 404 if no permit with the given id is not found
    }

    @PostMapping
    public ResponseEntity<ParkingPermit> createParkingPermit(@RequestBody ParkingPermit permit) {
        log.debug("REST POST request to create a parking permit: /api/permit/");
        ParkingPermit savedPermit = parkingPermitRepository.save(permit);
        return ResponseEntity.created(URI.create("/api/permit/" + savedPermit.getId())).body(savedPermit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParkingPermit> createParkingPermit(@PathVariable("id") Long id, @RequestBody ParkingPermit permit) {
        log.debug("REST PUT request to update a parking permit with id " + id + ": /api/permit/{id}");
        Optional<ParkingPermit> oldPermit = parkingPermitRepository.findById(id);
        if (oldPermit.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            permit.setId(id);
            ParkingPermit updatedPermit = parkingPermitRepository.save(permit);
            return ResponseEntity.ok(updatedPermit);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParkingPermit(@PathVariable("id") Long id) {
        log.debug("REST DELETE request to delete a parking permit with id " + id + ": /api/permit/{id}");
        parkingPermitRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
